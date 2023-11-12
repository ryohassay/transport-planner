import { useState } from "react"
import axios from "axios";
import "react-datetime/css/react-datetime.css";
import './App.css';
import Form from "./components/Form";
import Loading from "./components/Loading";
import Result from "./components/Result";
import { ErrorType, FormPropsType, RouteType, IdSetType, modesType, WaypointType } from "./types";
import { NUM_ROUTES, NUM_WAYPOINTS } from "./consts";

function App() {
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<ErrorType>({
        status: false,
        message: "",
    });
    const [result, setResult] = useState({});

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
    const options = {
        modes: modes,
        setModes: setModes,
        speed: speed,
        setSpeed: setSpeed,
        order: order,
        setOrder: setOrder,
    };

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
                    console.log(res.data.error_message);
                }
                else{
                    setError({
                        status: false,
                        message: ""
                    });
                    setResult(res.data.result); 
                    console.log(res.data.result);
                }
            })
            .then(() => setLoading(false))
            .catch(err => console.log(err));
        
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

    // console.log(routes, waypoints, options);

    return (
        <div className="App">
            <Form {...formProps} />
            {loading ? <Loading /> : <Result error={error} result={result} />}
        </div>
    );
}

export default App;
