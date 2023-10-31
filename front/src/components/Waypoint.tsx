import { useState } from "react";
import { RoutePropsType, ViaListType } from "../types";
import { NUM_WAYPOINTS } from "../consts";


const Waypoint = ({ index, routes, setRoutes, waypoints, setWaypoints }: RoutePropsType) => {
    const [waypointCount, setWaypointCount] = useState<number>(0);
    
    const addWaypoint = () => {
        setWaypoints([
            ...waypoints, 
            {
                id: (new Date()).valueOf(),
                text: "",
                parentId: index,
            }
        ]);
        
        setWaypointCount(prevCount => prevCount + 1);
    };

    const setWaypoint = (index: number, value: string) => {
        setWaypoints(waypoints.map((waypoint, i) => (i === index ? {
            id: waypoint.id,
            text: value,
            parentId: waypoint.parentId
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
                                <dd><input type="text" name={"waypoint" + index} placeholder="経由地" onChange={e => setWaypoint(index, e.target.value)} /></dd>
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
