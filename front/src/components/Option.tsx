import { optionsType } from "../types";
import Mode from "./Mode";
import Order from "./Order";
import Speed from "./Speed";

type optionPropsType = {
    options: optionsType
}

const Option = ({ options }: optionPropsType) => {    
    return (
        <div>
            <Mode modes={options.modes} setModes={options.setModes} />
            <Speed speed={options.speed} setSpeed={options.setSpeed} />
            <Order order={options.order} setOrder={options.setOrder} />
        </div>
    );
};

export default Option;
