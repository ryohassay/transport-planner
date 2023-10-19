import { useState } from "react";
import Route from "./Route";
import Option from "./Option";
import { TimeSpecType, ViaType, ViaListType, RouteType, QueryType, optionsType } from "../types";
import { NUM_ROUTES } from "../consts";


type FormPropsType = {
    query: QueryType,
    routeCount: number, 
    setRouteCount: React.Dispatch<React.SetStateAction<number>>,
    handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void,
}

const Form = ({ query, routeCount, setRouteCount, handleSubmit }: FormPropsType) => {
    const [viaCount, setViaCount] = useState<number>(0);

    return (
        <form id="search" onSubmit={handleSubmit}>
            <ul className="routes">
                {
                    Array.from({length: routeCount}, (_, index) => {
                        return (
                            <li key={index}>
                                <Route viaCount={viaCount} setViaCount={setViaCount} index={index} route={query.routes[index]} handleSubmit={handleSubmit} />
                            </li>
                        );
                    })
                }
            </ul>

            <button type="button" onClick={() => setRouteCount(prevCount => prevCount + 1)} disabled={routeCount >= NUM_ROUTES}>経路を追加</button>

            <Option options={query.options}/>
            <button form="search" type="submit">検索</button>
        </form>
    );
};

export default Form;
