import { TransportType } from "../types";

type TransportPropsType = {
    transport: TransportType,
}

const Transport = ({ transport }: TransportPropsType) => {
    return (
        <tr className="transport-row">
            <td className="time"></td>
            <td className="line">
                <span className="line-color" style={{backgroundColor: transport.color}}></span>
            </td>
            <td className="transport">{transport.name}</td>
        </tr>
    );
};

export default Transport;
