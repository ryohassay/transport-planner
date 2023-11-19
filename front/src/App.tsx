import { useState } from "react"
import axios from "axios";
import './App.css';
import Header from "./components/Header";
import Form from "./components/Form";
import Loading from "./components/Loading";
import Result from "./components/Result";
import Footer from "./components/Footer";
import { ErrorType, ResultType, FormPropsType, RouteType, modesType, WaypointType } from "./types";
import { NUM_ROUTES, NUM_WAYPOINTS } from "./consts";

function App() {
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<ErrorType>({
        status: false,
        message: "",
    });
    const [results, setResults] = useState<ResultType[]>([]);

    const route: RouteType = {
        origin: "",
        destination: "",
        datetime: new Date(),
        timeSpec: "departure",
    };

    const [waypoints, setWaypoints] = useState<WaypointType[]>(new Array<WaypointType>(NUM_ROUTES * NUM_WAYPOINTS).fill({text: ""}));  // indeces 0-2: the first route, 3-5: the second route, ...
    const [routes, setRoutes] = useState<RouteType[]>([route]);

    const [modes, setModes] = useState<modesType>({
        al: true,
        shin: true,
        ex: true,
        hb: true,
        lb: true,
        sr: true,
    });

    const [speed, setSpeed] = useState<number | null>(2);  // 歩く速さ：少し速い
    const [order, setOrder] = useState<number | null>(0);  // 順番：到着順

    const query = {
        routes: routes,
        waypoints: waypoints,
        modes: modes,
        speed: speed,
        order: order,
    };

    const handleSubmit= (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        const response = axios.post("http://127.0.0.1:5000", query)
            .then((res) => {
                if(res.data.error){
                    setError({
                        status: true,
                        message: res.data.error_message
                    });
                }
                else{
                    setError({
                        status: false,
                        message: ""
                    });
                    setResults(res.data.result);
                }
            })
            .then(() => setLoading(false))
            .catch(err => {
                setError({status: true, message: err});
                console.log(err);
            });
        
        console.log(response);  // Test
    };

    const formProps: FormPropsType = {
        routes: routes,
        setRoutes: setRoutes,
        waypoints: waypoints,
        setWaypoints: setWaypoints,
        modes: modes,
        setModes: setModes,
        speed: speed,
        setSpeed: setSpeed,
        order: order,
        setOrder: setOrder,
        handleSubmit: handleSubmit,
    };

    return (
        <div className="App">
            <header>
                <Header />
            </header>

            <main>
                <Form {...formProps} />
                {loading ? <Loading /> : <Result error={error} results={results} />}
            </main>

            <footer>
                <Footer />
            </footer>
        </div>
    );
}

export default App;
