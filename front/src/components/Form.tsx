import { useState } from "react";
import Route from "./Route";
import Option from "./Option";
import { RouteType, modesType } from "../types";
import { NUM_ROUTES } from "../consts";


type FormPropsType = {
    routes: RouteType[],
    setRoutes: React.Dispatch<React.SetStateAction<RouteType[]>>,
    waypoints: any[],
    setWaypoints: React.Dispatch<React.SetStateAction<any[]>>,
    modes: modesType,
    setModes: React.Dispatch<React.SetStateAction<modesType>>,
    speed: number | null,
    setSpeed: React.Dispatch<React.SetStateAction<number | null>>,
    order: number | null,
    setOrder: React.Dispatch<React.SetStateAction<number | null>>,
    handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void
}

const Form = ({routes, setRoutes, waypoints, setWaypoints, modes, setModes, speed, setSpeed, order, setOrder, handleSubmit}: FormPropsType) => {
    const addRoutes = () => {
        const newRoute: RouteType = {
            index: null,
            origin: "",
            destination: "",
            datetime: new Date(),
            timeSpec: "departure",
            waypointIds: [],
        }

        setRoutes([...routes, newRoute]);
    };
    
    const routeQuery = {
        routes: routes,
        setRoutes: setRoutes,
        waypoints: waypoints,
        setWaypoints: setWaypoints
    }

    const options = {
        modes: modes,
        setModes: setModes,
        speed: speed,
        setSpeed: setSpeed,
        order: order,
        setOrder: setOrder
    }

    return (
        <form id="search" onSubmit={handleSubmit}>
            <ul className="routes">
                {
                    Array.from({length: routes.length}, (_, index) => {
                        return (
                            <li key={index}>
                                <Route {...routeQuery} index={index} />
                            </li>
                        );
                    })
                }
            </ul>

            <button type="button" onClick={addRoutes} disabled={routes.length >= NUM_ROUTES}>経路を追加</button>

            <Option {...options}/>
            <button form="search" type="submit">検索</button>
        </form>
    );
};

export default Form;
