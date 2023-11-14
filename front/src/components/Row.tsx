import { RowPropsType } from "../types";

const Row = ({ station, transport }: RowPropsType) => {
    return (
        <tbody>
            <tr className="station-row">
                <td className="time">
                    <ul>
                        <li>{station.dep_tm === null ? "" : station.dep_tm}</li>
                        <li>{station.arr_tm === null ? "" : station.arr_tm}</li>
                    </ul>
                </td>
                <td className="symbol"><span className="circle"></span></td>
                <td className="name">{station.name}</td>
            </tr>

            {transport === undefined ? "" : 
                <tr className="transport-row">
                    <td className="time"></td>
                    <td className="line">
                        <span className="line-color" style={{backgroundColor: transport.color}}></span>
                        <td className="transport">{transport.name}</td>
                    </td>
                </tr>
            }
        </tbody>
    );
};

export default Row;
