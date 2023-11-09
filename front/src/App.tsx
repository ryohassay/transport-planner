import { useState } from "react"
import axios from "axios";
import "react-datetime/css/react-datetime.css";
import './App.css';
import Form from "./components/Form";
import { FormPropsType, RouteType, IdSetType, modesType, WaypointType } from "./types";
import { NUM_ROUTES, NUM_WAYPOINTS } from "./consts";

function App() {
    const route: RouteType = {
        origin: "",
        destination: "",
        datetime: new Date(),
        timeSpec: "departure",
    };

    const [waypoints, setWaypoints] = useState<WaypointType[]>(new Array<WaypointType>(NUM_ROUTES * NUM_WAYPOINTS).fill({text: ""}));  // indeces 0-2: the first route, 3-5: the second route, ...

    // const [routes, setRoutes] = useState<RouteType[]>(new Array<RouteType>(NUM_ROUTES).fill(route));
    const [routes, setRoutes] = useState<RouteType[]>([route]);

    const [modes, setModes] = useState<modesType>({
        al: true,
        shin: true,
        ex: true,
        hb: true,
        lb: true,
        sr: true,
    });

    const [speed, setSpeed] = useState<number | null>(null);
    const [order, setOrder] = useState<number | null>(null);
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

        const response = axios.post("http://127.0.0.1:5000/", query)
        .catch(err => console.log(err));
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

    console.log(routes, waypoints, options);

    return (
        <div className="App">
            <Form {...formProps} />
        </div>
    );
}

export default App;
