import requests, re
from bs4 import BeautifulSoup, element
from datetime import datetime as dt
from datetime import timezone, timedelta
from dataclasses import dataclass, field

from station import Station
from transport import Transport


# ================================= Constants =================================
URL_BASE = 'https://transit.yahoo.co.jp/search/print?from={origin}&to={destination}'
DATETIME = '&y={yyyy}&m={mm:02}&d={dd:02}&hh={hh:02}&m1={m1}&m2={m2}&type={time_spec}'
# 出発：1, 到着：4,　始発：3, 終電：2, 指定なし：5
# OPTIONS = '&ticket={tk}&expkind={expkind}&userpass={userpass}&ws={walk_sp}&s={disp_ord}&al={airplane}&shin={shinkansen}&ex={express}&hb={exp_bus}&lb={bus}&sr={ferry}'
OPTIONS = '&ws={speed}&s={order}&al={airplane}&shin={shinkansen}&ex={express}&hb={exp_bus}&lb={bus}&sr={ferry}'
# ticket: ic or normal
# expkind: 1 (自由席), 2 (指定席), 3 (グリーン車)
# userpass: 1
# s (display order): 0 (到着順), 2 (乗換回数順), 1 (料金順)
# al to sr: 0 or 1
PAGE = '&no={page}'

NUM_PAGES = 3  # Number of search results (pages) per route
# =============================================================================


class RouteSearch:
    def __init__(self, init_route: dict, init_route_waypoints: list[dict[str, bool]], init_modes: dict, init_speed: int, init_order: int) -> None:
        time_spec_dict = {'departure': 1, 'arrival': 4,'first': 3, 'last': 2, 'none': 5}
        
        self.origin: str = init_route['origin']
        self.destination: str = init_route['destination']
        self.datetime: dt = dt.fromisoformat(init_route['datetime']).astimezone(timezone(timedelta(hours=+9)))  # Attach timezone (JST)
        self.time_spec: int = time_spec_dict[init_route['timeSpec']]
        self.route_waypoints = init_route_waypoints
        self.modes = init_modes
        self.speed = init_speed
        self.order = init_order
        self.url: str | None = None
        self.soups: list[BeautifulSoup | None] = [None] * NUM_PAGES
        self.errors: list[bool] = [False] * NUM_PAGES


    def _get_html(self, url: str) -> BeautifulSoup:
        html = requests.get(url).content
        soup = BeautifulSoup(html, 'html.parser')
        return soup


    def search(self) -> None:
        url = URL_BASE.format(origin=self.origin, destination=self.destination)
        if self.datetime is not None:
            m1, m2 = int(self.datetime.minute / 10), int(self.datetime.minute % 10)
            url += DATETIME.format(yyyy=self.datetime.year, mm=self.datetime.month, dd=self.datetime.day, hh=self.datetime.hour, m1=m1, m2=m2, time_spec=self.time_spec)

        airplane, shinkansen, express, exp_bus, bus, ferry = [int(bool(mode)) for mode in self.modes]
        url += OPTIONS.format(speed=self.speed, order=self.order, airplane=airplane, shinkansen=shinkansen, express=express, exp_bus=exp_bus, bus=bus, ferry=ferry)
        self.url = url

        for i in range(NUM_PAGES):
            page_url = self.url + PAGE.format(page=(i + 1))
            soup = self._get_html(page_url)

            # Find error from the HTML code
            title = soup.head.find('title').get_text()
            if title == '乗換案内、時刻表、運行情報 - Yahoo!路線情報':
                self.errors[i] = True
            
            self.soups[i] = soup
        

@dataclass
class RouteSummary:
    dep_tm = None
    arr_tm = None
    fare: int | None = None
    stations: list[Station] = field(default_factory=list)
    transports: list[Transport] = field(default_factory=list)


class RouteInfo:
    def __init__(self, search: RouteSearch) -> None:
        self.search = search
        self.origin: str = search.origin
        self.destination: str = search.destination
        self.summaries: list[RouteSummary] = []
        for i in range(NUM_PAGES):
            self.summaries.append(RouteSummary())


    def get_summary(self) -> bool:
        for i in range(NUM_PAGES):
            if self.search.errors[i]:
                return False
            else:
                route_summary = self.search.soups[i].find('div', class_='routeSummary')
                fare_str = route_summary.find('li', class_='fare').get_text().replace(',', '')  # 数字中のコンマ削除
                self.summaries[i].fare = int(re.search(r'\d+', fare_str).group())
                if self.search.time_spec != 5:
                    time_str = route_summary.find('li', class_='time').get_text()
                    self.summaries[i].dep_tm, self.summaries[i].arr_tm = re.findall(r'((?:[01][0-9]|2[0-3]):[0-5][0-9])', time_str)
        
        return True


    def _get_sta_htmls(self, page: int) -> list[element.Tag]:
        route_detail = self.search.soups[page].find('div', class_='routeDetail')
        sta_htmls = route_detail.find_all('div', class_='station')
        # print('Page ', page, sta_htmls)  # Test
        return sta_htmls


    def _get_trpt_htmls(self, page: int) -> list[element.Tag]:
        route_detail = self.search.soups[page].find('div', class_='routeDetail')
        trpt_htmls = route_detail.find_all('li', class_='transport')
        # print('Page ', page, trpt_htmls)  # Test
        return trpt_htmls


    def get_detail(self) -> bool:
        for i in range(NUM_PAGES):
            if self.search.errors[i]:
                return False
            else:
                has_time = False if self.search.time_spec == 5 else True

                sta_htmls = self._get_sta_htmls(i)
                for sta_html in sta_htmls:
                    station = Station()
                    station.set_info(sta_html, has_time)
                    self.summaries[i].stations.append(station)

                trpt_htmls = self._get_trpt_htmls(i)
                for trpt_html in trpt_htmls:
                    transport = Transport()
                    transport.set_info(trpt_html)
                    self.summaries[i].transports.append(transport)

        return True
        

    def getJson(self) -> dict:
        pages = []
        for i in range(NUM_PAGES):
            stations_js = []
            for station in self.summaries[i].stations:
                station_js = {
                    'name': station.name,
                    'dep_tm': station.dep_tm,
                    'arr_tm': station.arr_tm
                }
                stations_js.append(station_js)

            transports_js = []
            for transport in self.summaries[i].transports:
                transport_js = {
                    'name': transport.name,
                    'color': transport.color
                }
                transports_js.append(transport_js)
            
            page = {
                'dep_tm': self.summaries[i].dep_tm,
                'arr_tm': self.summaries[i].arr_tm,
                'fare': self.summaries[i].fare,
                'stations': stations_js,
                'transports': transports_js,
            }

            pages.append(page)

        route_js = {
            'origin': self.origin,
            'dest': self.destination,
            'pages': pages,
            'url': self.search.url
        }

        return route_js
