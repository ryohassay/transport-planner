import { StationType } from "../types";

type StationPropsType = {
    station: StationType
}

const Station = ({ station }: StationPropsType) => {
    return (
        <tr className="station-row">
            <td className="time">
                <ul>
                    <li key="arr-tm">{station.arr_tm === null ? "" : station.arr_tm}</li>
                    <li key="dep-tm">{station.dep_tm === null ? "" : station.dep_tm}</li>
                </ul>
            </td>
            <td className="symbol"><span className="circle"></span></td>
            <td className="name">{station.name}</td>
        </tr>
    );
}

export default Station;
