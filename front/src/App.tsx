import { useState } from "react"
import axios from "axios";
import "react-datetime/css/react-datetime.css";
import './App.css';
import Form from "./components/Form";
import { TimeSpecType, ViaListType, RouteType, QueryType, modesType } from "./types";
import { NUM_ROUTES } from "./consts";

function App() {
    const [viaCount, setViaCount] = useState<number>(0);

    const [index, setIndex] = useState<number | null>(null);
    const [origin, setOrigin] = useState<string>("");
    const [destination, setDestination] = useState<string>("");
    const [datetime, setDatetime] = useState<Date>(new Date());
    const [timeSpec, setTimeSpec] = useState<TimeSpecType>("departure");
    const [vias, setVias] = useState<ViaListType>(["", "", ""]);

    const route: RouteType = {
        index: index,
        setIndex: setIndex,
        origin: origin,
        setOrigin: setOrigin,
        destination: destination,
        setDestination: setDestination,
        datetime: datetime,
        setDatetime: setDatetime,
        timeSpec: timeSpec,
        setTimeSpec: setTimeSpec,
        vias: vias,
        setVias: setVias,
    };

    const [routes, setRoutes] = useState<RouteType[]>(new Array<RouteType>(NUM_ROUTES).fill(route));

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

    const query: QueryType = {
        viaCount: viaCount,
        setViaCount: setViaCount,
        routes: routes,
        setRoutes: setRoutes,
        options: options,
    };

    const [routeCount, setRouteCount] = useState<number>(1);

    const handleSubmit= (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(e.target);  // Test
        console.log(routeCount, query);  // Test

        const response = axios.post("http://127.0.0.1:5000/", query)
        .catch(err => console.log(err));
    };

    return (
        <div className="App">
            <Form query={query} routeCount={routeCount} setRouteCount={setRouteCount} handleSubmit={handleSubmit}/>
        </div>
    );
}

export default App;
