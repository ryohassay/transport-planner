from flask import Flask, render_template, request, send_from_directory
from datetime import datetime as dt
from datetime import time as tm
from flask_cors import CORS

from route import RouteSearch, RouteInfo
from arg_parser import Parser

NUM_WAYPOINTS = 3  # Number of waypoints per route


app = Flask(__name__, template_folder='../front/build', static_folder='../front/build/static')
# app.add_url_rule('/', 'root', lambda: app.send_static_file('index.html'))
CORS(app)

@app.after_request
def after_request(response):
    response.headers.add('Access-Control-Allow-Origin', 'http://localhost:5000')
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type')
    response.headers.add('Access-Control-Allow-Methods', 'GET,POST')
    return response


def _convert_tm_type(tm_type_str: str) -> int:
    if tm_type_str == 'departure':
        tm_type = 1
    elif tm_type_str == 'arrival':
        tm_type = 4
    elif tm_type_str == 'first':
        tm_type = 3
    elif tm_type_str == 'last':
        tm_type = 2
    elif tm_type_str == 'none' or tm_type_str == '':
        tm_type = 5
    else:
        raise ValueError('The value of `tm_type` is not valid.')

    return tm_type


# def _search_transit(start: str, dest: str, tm: dt, tm_type: int):  # Legacy
#     route = Route(RouteSearch(start, dest, tm, tm_type))
#     route.search.search()
#     result = route.get_summary()
#     route.get_detail()
#     if result:
#         return route
#     else:  # if the search result is an error
#         return None
    

def _search_transit(route: list[dict], route_waypoints: list[dict], modes: dict, speed: int, order: int) -> list[dict] | None:
    route_info = []

    for page in range(NUM_PAGES):  # page: from 0 to NUM_PAGES - 1
        search = RouteSearch(route, route_waypoints, modes, speed, order, page + 1)
        search.search()

        route_info_page = RouteInfo(search)
        summary_res = route_info_page.get_summary()
        if not summary_res:
           return None
        else:
            detail_res = route_info_page.get_detail()
            if not detail_res:
                return None
            else:
                route_info.append(route_info_page)
    
    return route_info  # This being `None` means it got an error in parsing HTML


def _convert_route_for_js(route_info: RouteInfo) -> list[dict]:
    stations_js = []
    for station in route_info.stations:
        station_js = {
            "name": station.name,
            "dep_tm": station.dep_tm,
            "arr_tm": station.arr_tm
        }
        stations_js.append(station_js)

    transports_js = []
    for transport in route_info.transports:
        transport_js = {
            "name": transport.name,
            "color": transport.color
        }
        transports_js.append(transport_js)

    route_js = {
        "start": route_info.start,
        "dest": route_info.dest,
        "dep_tm": route_info.dep_tm,
        "arr_tm": route_info.arr_tm,
        "fare": route_info.fare,
        "stations": stations_js,
        "transports": transports_js,
        "url": route_info.search.url
    }

    return route_js


@app.route('/')
def index():
    return render_template("index.html", error_msg=None)

# @app.route('/')
# def index():
#     return send_from_directory('../front', 'public/index.html')


@app.route("/", methods=['post'])
def result():
    query = request.get_json()
    print(query)  # Test

    routes, waypoints, modes, speed, order = [query.get(key) for key in query.keys()]

    for i, route in enumerate(routes):
        route_waypoints = waypoints[NUM_WAYPOINTS * i : NUM_WAYPOINTS * (i + 1)]
        route_result = _search_transit(route, route_waypoints, modes, speed, order)  # Fix this function
        print(route_result)  # Test
    
    routes_js = []
    # for i in range(5):
    #     ip_start = request.form["ip[{}]['start']".format(i)]
    #     ip_dest = request.form["ip[{}]['dest']".format(i)]
    #     ip_tm_type = request.form["ip[{}]['tm_type']".format(i)]
    #     ip_date = request.form["ip[{}]['date']".format(i)]
    #     ip_time = request.form["ip[{}]['time']".format(i)]

    #     if ip_start != "" and ip_dest != "":
    #         if ip_time == '':
    #             ip_dt = dt.now()
    #         elif ip_date == '':
    #             today = dt.today()
    #             time = tm.fromisoformat(ip_time)
    #             ip_dt = dt.combine(today, time)
    #         else:
    #             ip_dt = dt.strptime('{} {}'.format(ip_date, ip_time), '%Y-%m-%d %H:%M')

    #         ip_tm_type_int = _convert_tm_type(ip_tm_type)
    #         route = _search_transit(ip_start, ip_dest, ip_dt, ip_tm_type_int)

    #         if route is None:
    #             error_msg = '出発地または到着地が正しくありません。'
    #             return render_template("index.html", error_msg=error_msg)

    #         # Rearrange the object to list of dictionaries
    #         route_js = _convert_route_for_js(route)
    #         routes_js.append(route_js)

    return render_template("index.html", routes=routes_js)
    # return render_template("index.html")


# @app.route("/favicon.ico")
# def favicon():
#     return app.send_static_file("static/favicon.ico")


if __name__ == '__main__':
    parser = Parser()
    args = parser.get_args()
    app.run(debug=args.debug, host=args.host)
