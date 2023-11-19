from flask import Flask, Response, render_template, request, jsonify, make_response
from flask_cors import CORS

from route import RouteSearch, RouteInfo
from arg_parser import Parser

NUM_WAYPOINTS = 3  # Number of waypoints per route
NUM_PAGES = 3  # Number of search results (pages) per route


app = Flask(__name__, template_folder='../front/build', static_folder='../front/build/static')
# app.add_url_rule('/', 'root', lambda: app.send_static_file('index.html'))
CORS(app, origins="http://localhost:3000")

@app.after_request
def after_request(response: Response):
    # response.headers.add('Access-Control-Allow-Origin', 'http://localhost:3000')
    # response.headers.add('Access-Control-Allow-Headers', 'Content-Type')
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
    # print(query)  # Test

    routes, waypoints, modes, speed, order = [query.get(key) for key in query.keys()]

    routes_js: list[dict] = []
    for i, route in enumerate(routes):
        route_waypoints = waypoints[NUM_WAYPOINTS * i : NUM_WAYPOINTS * (i + 1)]
        route_js = _search_transit(route, route_waypoints, modes, speed, order)
        # print(route_js)  # Test

        if route_js is None:
            error_msg = '出発地または到着地が正しくありません。'
            # return render_template('index.html', error_msg=error_msg)
            return make_response(jsonify({
                'error': True,
                'error_message': error_msg
            }))

        
        routes_js.append(route_js)

    print(routes_js)
    return make_response(jsonify({
        'error': False,
        'result': routes_js
    }))


if __name__ == '__main__':
    parser = Parser()
    args = parser.get_args()
    app.run(debug=args.debug, host=args.host)
