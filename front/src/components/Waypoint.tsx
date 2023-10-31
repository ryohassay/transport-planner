import { useState, useId } from "react";
import { WaypointPropsType } from "../types";
import { NUM_WAYPOINTS } from "../consts";


const Waypoint = ({ routeId, routes, setRoutes, waypoints, setWaypoints, idList, setIdList }: WaypointPropsType) => {
    const [waypointCount, setWaypointCount] = useState<number>(0);
    
    const addWaypoint = () => {
        const id = useId()
        setWaypoints([
            ...waypoints, 
            {
                id: id,
                text: "",
                routeId: routeId,
            }
        ]);
        // setIdList([...idList, {
        //     routeId: routeId,
        //     waypointIds: [
        //         ..., 
        //         id
        //     ],
        // }]);  // Fix this
        setWaypointCount(prevCount => prevCount + 1);
    };

    const setWaypoint = (index: number, value: string) => {
        setWaypoints(waypoints.map((waypoint, i) => (i === index ? {
            id: waypoint.id,
            text: value,
            routeId: waypoint.routeId
        } : waypoint)));
    };
    
    return (
        <div>
            <ul className="waypoint">
                {Array.from({length: waypointCount}, (_, index) => {
                    return (
                        <li key={index}>
                            <dl>
                                <dt>経由{index + 1}</dt>
                                <dd><input type="text" name={"waypoint-" + index} placeholder="経由地" onChange={e => setWaypoint(index, e.target.value)} /></dd>
                            </dl>
                        </li>
                    );
                })}
            </ul>
            
            <button type="button" onClick={addWaypoint} disabled={waypointCount >= NUM_WAYPOINTS}>経由地を追加</button>
        </div>
    );
};

export default Waypoint;
