import { useState } from "react"
import axios from "axios";
import "react-datetime/css/react-datetime.css";
import './App.css';
import Form from "./components/Form";
import { TimeSpecType, ViaListType, RouteType, QueryType, modesType, WaypointType } from "./types";
import { NUM_ROUTES } from "./consts";

function App() {
    // const [viaCount, setViaCount] = useState<number>(0);

    // const [index, setIndex] = useState<number | null>(null);
    // const [origin, setOrigin] = useState<string>("");
    // const [destination, setDestination] = useState<string>("");
    // const [datetime, setDatetime] = useState<Date>(new Date());
    // const [timeSpec, setTimeSpec] = useState<TimeSpecType>("departure");
    // const [vias, setVias] = useState<ViaListType>(["", "", ""]);

    // const [route, setRoute] = useState({
    //     index: null,
    //     origin: "",
    //     destination: "",
    //     datetime: new Date(),
    //     timeSpec: "departure",
    //     trPoints: ["", "", ""],  // Max three transit points
    // });

    const route: RouteType = {
        index: null,
        origin: "",
        destination: "",
        datetime: new Date(),
        timeSpec: "departure",
        waypointIds: [],
    };

    const [waypoints, setWaypoints] = useState<WaypointType[]>([]);

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

    const handleSubmit= (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        console.log(query);  // Test

        const response = axios.post("http://127.0.0.1:5000/", query)
        .catch(err => console.log(err));
    };

    const query = {
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
    }

    console.log(query)

    return (
        <div className="App">
            <Form {...query} handleSubmit={handleSubmit}/>
        </div>
    );
}

export default App;
