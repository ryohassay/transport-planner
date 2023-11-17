import { modesType } from "../types";
import Mode from "./Mode";
import Order from "./Order";
import Speed from "./Speed";

type optionPropsType = {
    modes: modesType,
    setModes: React.Dispatch<React.SetStateAction<modesType>>,
    speed: number | null,
    setSpeed: React.Dispatch<React.SetStateAction<number | null>>,
    order: number | null,
    setOrder: React.Dispatch<React.SetStateAction<number | null>>,
}

const Option = ({ modes, setModes, speed, setSpeed, order, setOrder }: optionPropsType) => {    
    return (
        <div className="options-container">
            <table>
                <tbody>
                    <tr><td>手段</td><td><Mode modes={modes} setModes={setModes} /></td></tr>
                    <tr><td>歩く速さ</td><td><Speed speed={speed} setSpeed={setSpeed} /></td></tr>
                    <tr><td>表示順</td><td> <Order order={order} setOrder={setOrder} /></td></tr>
                </tbody>
            </table>
        </div>
    );
};

export default Option;
