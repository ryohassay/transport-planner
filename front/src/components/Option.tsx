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

const Option = ({modes, setModes, speed, setSpeed, order, setOrder}: optionPropsType) => {    
    return (
        <div>
            <Mode modes={modes} setModes={setModes} />
            <Speed speed={speed} setSpeed={setSpeed} />
            <Order order={order} setOrder={setOrder} />
        </div>
    );
};

export default Option;
