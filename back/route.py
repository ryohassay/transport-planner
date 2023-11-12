import requests, re
from bs4 import BeautifulSoup, element
from datetime import datetime as dt
from dataclasses import dataclass

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
    # def __init__(self, init_start: str, init_dest: str, init_tm: dt = None, init_tm_type: int = 5, init_options: List = None, init_page: int = 1) -> None:  # Legacy
    #     self.start = init_start
    #     self.dest = init_dest
    #     self.tm = init_tm
    #     self.tm_type = init_tm_type
    #     self.options = init_options
    #     self.page = init_page
    #     self.url = None
    #     self.soup = None
    #     self.error = False


    def __init__(self, init_route: dict, init_route_waypoints: list[dict[str, bool]], init_modes: dict, init_speed: int, init_order: int) -> None:
        time_spec_dict = {'departure': 1, 'arrival': 4,'first': 3, 'last': 2, 'none': 5}
        
        self.origin: str = init_route['origin']
        self.destination: str = init_route['destination']
        self.datetime: dt = dt.fromisoformat(init_route['datetime'])
        self.time_spec: int = time_spec_dict[init_route['timeSpec']]
        self.route_waypoints = init_route_waypoints
        self.modes = init_modes
        self.speed = init_speed
        self.order = init_order
        self.url: str | None = None
        self.soups: list[BeautifulSoup] = []
        self.errors: list[bool] = False


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

        for page in range(NUM_PAGES):
            page_url = self.url + PAGE.format(page=(page + 1))
            soup = self._get_html(page_url)

            # Find error from the HTML code
            title = soup.head.find('title').get_text()
            if title == '乗換案内、時刻表、運行情報 - Yahoo!路線情報':
                self.errors[page] = True
            
            self.soups.append(soup)


@dataclass
class RouteSummary:
    dep_tm = None
    arr_tm = None
    fare: int | None = None
    stations: list[Station] = []
    transports: list[Transport] = []


class RouteInfo:
    # def __init__(self, search: RouteSearch) -> None:
    #     self.search = search

    #     self.start: str = search.start
    #     self.dest: str = search.dest

    #     self.dep_tm = None
    #     self.arr_tm = None
    #     self.fare: int = None
    #     self.stations: list[Station] = []
    #     self.transports: list[Transport] = []


    def __init__(self, search: RouteSearch) -> None:
        self.search = search
        self.origin: str = search.origin
        self.destination: str = search.destination
        self.summaries: list[RouteSummary] = [RouteSummary()] * NUM_PAGES


    def get_summary(self) -> bool:
        for page in range(NUM_PAGES):
            if self.search.errors[page]:
                return False
            else:
                route_summary = self.search.soups[page].find('div', class_='routeSummary')
                fare_str = route_summary.find('li', class_='fare').get_text().replace(',', '')  # 数字中のコンマ削除
                self.summaries[page].fare = int(re.search(r'\d+', fare_str).group())
                if self.search.time_spec != 5:
                    time_str = route_summary.find('li', class_='time').get_text()
                    self.summaries[page].dep_tm, self.summaries[page].arr_tm = re.findall(r'((?:[01][0-9]|2[0-3]):[0-5][0-9])', time_str)
                return True


    def _get_sta_htmls(self, page: int) -> list[element.Tag]:
        route_detail = self.search.soups[page].find('div', class_='routeDetail')
        sta_htmls = route_detail.find_all('div', class_='station')
        return sta_htmls


    def _get_trpt_htmls(self, page: int) -> list[element.Tag]:
        route_detail = self.search.soups[page].find('div', class_='routeDetail')
        trpt_htmls = route_detail.find_all('li', class_='transport')
        return trpt_htmls


    def get_detail(self) -> bool:
        for page in range(NUM_PAGES):
            if self.search.errors[page]:
                return False
            else:
                has_time = False if self.search.time_spec == 5 else True

                sta_htmls = self._get_sta_htmls()
                for sta_html in sta_htmls:
                    station = Station()
                    station.set_info(sta_html, has_time)
                    self.summaries[page].stations.append(station)

                trpt_htmls = self._get_trpt_htmls()
                for trpt_html in trpt_htmls:
                    transport = Transport()
                    transport.set_info(trpt_html)
                    self.summaries[page].transports.append(transport)

                return True
        

    def getJson(self) -> list:
        stations_js = []
        for station in self.stations:
            station_js = {
                "name": station.name,
                "dep_tm": station.dep_tm,
                "arr_tm": station.arr_tm
            }
            stations_js.append(station_js)

        transports_js = []
        for transport in self.transports:
            transport_js = {
                "name": transport.name,
                "color": transport.color
            }
            transports_js.append(transport_js)

        route_js = {
            "origin": self.origin,
            "dest": self.destination,
            "dep_tm": self.dep_tm,
            "arr_tm": self.arr_tm,
            "fare": self.fare,
            "stations": stations_js,
            "transports": transports_js,
            "url": self.search.url
        }

        return route_js

    # def show_detail(self):
    #     if self.dep_tm and self.arr_tm and self.fare and self.stations and self.transports:
    #         for station, transport in zip(self.stations, self.transports):
    #             print('　　{}着\n{}\n　　{}発'.format(station.arr_tm, station.name, station.dep_tm))
    #             print('　｜\n　｜　　{}\n　｜'.format(transport.name))
    #         dest_sta = self.stations[len(self.stations) - 1]
    #         print('　　{}着\n{}\n'.format(dest_sta.arr_tm, dest_sta.name))
