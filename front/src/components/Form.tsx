import { useState } from "react";
import { TimeSpecType, ViaType, ViaListType, RouteType, QueryType, optionsType } from "../types";
import Route from "./Route";
import Option from "./Option";


type FormPropsType = {
    query: QueryType,
    routeCount: number, 
    setRouteCount: React.Dispatch<React.SetStateAction<number>>,
    handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void,
}

const Form = ({ query, routeCount, setRouteCount, handleSubmit }: FormPropsType) => {
    
    
    const [viaCount, setViaCount] = useState<number>(0);

    const [origin, setOrigin] = useState<string>("");
    const [destination, setDestination] = useState<string>("");
    const [datetime, setDatetime] = useState<Date>(new Date());
    const [timeSpec, setTimeSpec] = useState<TimeSpecType>("departure");
    const [via, setVia] = useState<ViaType>();
    const [vias, setVias] = useState<ViaListType>(["", "", ""]);

    const route: RouteType = {
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
    
    const addRouteCount = () => {
        setRouteCount((prevValue) => prevValue + 1);
    };

    const addRoute = (query: QueryType, index: number, newRoute: RouteType) => {
        const newRoutes = query.routes.map((route, i) => {
            if(i === index) {
                // Change the value (via)
                return newRoute;
            } 
            else {
                // The rest haven't changed
                return route;
            }
        });
        query.setRoutes(newRoutes);
    }
    
    return (
        <div>
            <ul className="routes">
                {
                    Array.from({length: routeCount}, (_, index) => {
                        return (
                            <li key={index}>
                                <Route viaCount={viaCount} setViaCount={setViaCount} route={query.routes[index]} handleSubmit={handleSubmit} />
                            </li>
                            
                        );
                    })
                }
            </ul>

            <button type="button" onClick={addRouteCount} disabled={routeCount >= 5}>経路を追加</button>

            <Option options={query.options}/>
            <button form="search" type="submit">検索</button>
        </div>
    );
};

export default Form;
