import Datetime from "react-datetime";
import ja  from "moment";
import { RoutePropsType, TimeSpecType } from "../types";
import Via from "./Via";

type radioOptionType = {
    value: TimeSpecType,
    text: string,
}

const Route = ({routes, setRoutes, waypoints, setWaypoints, index, handleSubmit }: RoutePropsType) => {
    const radioOptions: radioOptionType[] = [
        {value: "departure", text: "出発"}, 
        {value: "arrival", text: "到着"}, 
        {value: "first", text: "始発"}, 
        {value: "last", text: "終電"}, 
        {value: "none", text: "指定なし"}, 
    ];

    const keys = Object.keys(routes);

    const toISOStringInJpTime = (datetime: Date): string => {
        let str: string = datetime.toLocaleString("ja", { timeZone: 'Asia/Tokyo' }).padStart(2, '0').replaceAll("/", "-").replace(" ", "T");
        str = str.slice(0, 16);  // Remove seconds at the end
        return str
    };

    const updateState = (member: any, newValue: any) => {
        setRoutes(
            routes.map((route, i) => (i === index ? {...route, [member]: newValue} : route))
        );
    }

    return (
        <div className="route">
            <input type="text" name="origin" placeholder="出発駅・バス停・施設" onChange={e => updateState("origin", e.target.value)} />
            <input type="text" name="destination" placeholder="到着駅・バス停・施設" onChange={e => updateState("destination", e.target.value)} />
            <input type="datetime-local" name="datetime" value={toISOStringInJpTime(routes[index].datetime)} onChange={e => updateState("datetime", new Date(e.target.value))} />
            
            <div className="radio-container">
            {radioOptions.map((option) => (
                    <label key={option.value}>
                        <input
                            type="radio"
                            value={option.value}
                            name={"time-spec-" + index}
                            onChange={() => updateState("timeSpec", option.value)}
                            checked={option.value === routes[index].timeSpec}
                        />
                        {option.text}
                    </label>
                ))}
            </div>
            
            <Via waypointCount={routes[index].waypointIds.length} waypoints={waypoints} setWaypoints={setWaypoints} />
        </div>
    );
};

export default Route;
