import Datetime from "react-datetime";
import ja  from "moment";
import { FormPropsType, TimeSpecType } from "../types";
import Via from "./Via";

type radioOptionType = {
    value: TimeSpecType,
    text: string,
}

const Query = ({ viaCount, setViaCount, query, handleSubmit }: FormPropsType) => {
    const radioOptions: radioOptionType[] = [
        {value: "departure", text: "出発"}, 
        {value: "arrival", text: "到着"}, 
        {value: "first", text: "始発"}, 
        {value: "last", text: "終電"}, 
        {value: "none", text: "指定なし"}, 
    ];
    
    const toISOStringInJpTime = (datetime: Date): string => {
        let str: string = datetime.toLocaleString("ja", { timeZone: 'Asia/Tokyo' }).replaceAll("/", "-").replace(" ", "T");
        str = str.slice(0, 16);  // Remove seconds at the end
        return str
    };
    
    console.log(viaCount, query);  // Test 
    
    return (
        <form id="search" onSubmit={handleSubmit}>
            <input type="text" name="origin" placeholder="出発駅・バス停・施設" onChange={e => query.setOrigin(e.target.value)} />
            <input type="text" name="destination" placeholder="到着駅・バス停・施設" onChange={e => query.setDestination(e.target.value)} />
            <input type="datetime-local" name="datetime" value={toISOStringInJpTime(query.datetime)} onChange={e => query.setDatetime(new Date(e.target.value))} />
            
            {radioOptions.map((option) => (
                <label key={option.value}>
                    <input
                        type="radio"
                        value={option.value}
                        name={option.value}
                        onChange={() => query.setTimeSpec(option.value)}
                    />
                    {option .text}
                </label>
            ))}
            
            <Via viaCount={viaCount} setViaCount={setViaCount} vias={query.vias} setVias={query.setVias} />
        </form>
    );
};

export default Query;
