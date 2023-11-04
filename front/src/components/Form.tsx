import { useState, useId } from "react";
import Route from "./Route";
import Option from "./Option";
import { RouteType, modesType, FormPropsType } from "../types";
import { NUM_ROUTES } from "../consts";

const Form = ({ routes, setRoutes, waypoints, setWaypoints, modes, setModes, speed, setSpeed, order, setOrder, handleSubmit }: FormPropsType) => {
    const addRoutes = () => {
        const id = String((new Date()).valueOf());
        const newRoute: RouteType = {
            id: id,
            origin: "",
            destination: "",
            datetime: new Date(),
            timeSpec: "departure",
        };

        setRoutes([...routes, newRoute]);
    };
    
    const routeProps = {
        routes: routes,
        setRoutes: setRoutes,
        waypoints: waypoints,
        setWaypoints: setWaypoints,
    };

    const options = {
        modes: modes,
        setModes: setModes,
        speed: speed,
        setSpeed: setSpeed,
        order: order,
        setOrder: setOrder
    };

    return (
        <form id="search" onSubmit={handleSubmit}>
            <ul className="routes">
                {
                    Array.from({length: routes.length}, (_, index) => {
                        return (
                            <li key={index}>
                                <Route routeIndex={index} {...routeProps} />
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
