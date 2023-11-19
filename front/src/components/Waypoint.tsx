import { useState } from "react";
import { WaypointPropsType } from "../types";
import { NUM_WAYPOINTS } from "../consts";


const Waypoint = ({ routeIndex, waypoints, setWaypoints }: WaypointPropsType) => {
    const [waypointCount, setWaypointCount] = useState<number>(0);
    
    const setWaypoint = (index: number, value: string) => {
        // console.log(NUM_WAYPOINTS * routeIndex + index);  // Test
        
        setWaypoints(waypoints.map((waypoint, i) => (i === NUM_WAYPOINTS * routeIndex + index ? {
            text: value,
        } : waypoint)));
    };
    
    return (
        <div className="waypoint-container">
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
            
            <button type="button" onClick={() => setWaypointCount(prevCount => prevCount + 1)} disabled={waypointCount >= NUM_WAYPOINTS}>経由地を追加</button>
        </div>
    );
};

export default Waypoint;
