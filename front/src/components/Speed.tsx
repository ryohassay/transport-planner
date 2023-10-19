import { QueryType } from "../types";

type SpeedPropType = {
    speed: number | null,
    setSpeed: React.Dispatch<React.SetStateAction<number | null>>
}

type radioOptionType = {
    value: number,
    text: string,
}

const Speed = ({ speed, setSpeed }: SpeedPropType) => {
    const radioOptions: radioOptionType[] = [
        {value: 1, text: "速い"}, 
        {value: 2, text: "少し速い"}, 
        {value: 3, text: "少し遅い"}, 
        {value: 4, text: "遅い"}, 
    ];
    
    return (
        <div>
            {radioOptions.map((option) => (
                <label key={option.value}>
                    <input
                        type="radio"
                        value={option.value}
                        name="walk-speed"
                        onChange={() => setSpeed(option.value)}
                    />
                    {option.text}
                </label>
            ))}
        </div>
    );
};

export default Speed;
