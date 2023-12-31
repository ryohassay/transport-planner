import os
from dotenv import load_dotenv
from flask import Flask, Response, render_template, request, jsonify, make_response
from flask_cors import CORS

from route import RouteSearch, RouteInfo
from arg_parser import Parser

FRONT_DIR = '../front/build'
NUM_WAYPOINTS = 3  # Number of waypoints per route
NUM_PAGES = 3  # Number of search results (pages) per route

load_dotenv()

app = Flask(__name__, template_folder=FRONT_DIR, static_folder=FRONT_DIR,  static_url_path='/')
CORS(app, origins=['http://localhost:5000', os.environ['ADRESS']])


@app.after_request
def after_request(response: Response):
    # response.headers.add('Access-Control-Allow-Origin', 'http://localhost:5000')  # Test
    # response.headers.add('Access-Control-Allow-Headers', 'Content-Type')  # Test
    response.headers.add('Access-Control-Allow-Methods', 'GET,POST')
    return response


def _search_transit(route: list[dict], route_waypoints: list[dict], modes: dict, speed: int, order: int) -> dict | None:
    '''
    Return value: a dict to pass to the front-end or `None` when there is an error in parsing HTML
    '''
    search = RouteSearch(route, route_waypoints, modes, speed, order)
    search.search()

    route_info = RouteInfo(search)
    summary_res = route_info.get_summary()
    if not summary_res:
        return None
    else:
        detail_res = route_info.get_detail()
        if not detail_res:
            return None
        else:
            route_js = route_info.getJson()
    
    return route_js


@app.route('/')
def index():
    return render_template('index.html')


@app.route('/', methods=['post'])
def result():
    query = request.get_json()
    routes, waypoints, modes, speed, order = [query.get(key) for key in query.keys()]

    routes_js: list[dict] = []
    for i, route in enumerate(routes):
        route_waypoints = waypoints[NUM_WAYPOINTS * i : NUM_WAYPOINTS * (i + 1)]
        route_js = _search_transit(route, route_waypoints, modes, speed, order)
        # print(route_js)  # Test

        if route_js is None:
            error_msg = '出発地または到着地が正しくありません。'
            return make_response(jsonify({
                'error': True,
                'error_message': error_msg
            }))

        
        routes_js.append(route_js)

    # print(routes_js)  # Test
    return make_response(jsonify({
        'error': False,
        'result': routes_js
    }))


if __name__ == '__main__':
    parser = Parser()
    args = parser.get_args()
    app.run(debug=args.debug, host=args.host)
