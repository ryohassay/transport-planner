import { modesType, QueryType } from "../types";

type ModePropsType = {
    modes: modesType,
    setModes: React.Dispatch<React.SetStateAction<modesType>>
}

type radioOptionType = {
    value: keyof modesType,
    text: string,
}

const Mode = ({ modes, setModes }: ModePropsType) => {
    const keys = Object.keys(modes) as (keyof modesType)[];
    const radioOptions: radioOptionType[] = [
        {value: keys[0], text: "空路"}, 
        {value: keys[1], text: "新幹線"}, 
        {value: keys[2], text: "有料特急"}, 
        {value: keys[3], text: "高速バス"}, 
        {value: keys[4], text: "路線バス"}, 
        {value: keys[5], text: "フェリー"}
    ];

    const setMode = (key: (keyof modesType)) => {
        console.log(key, !modes[key]);  // Test
        setModes((prevModes) => ({
            ...prevModes,
            [key]: !(prevModes[key])
        }));
    };

    return (
        <div>
            {radioOptions.map((option) => (
                <label key={option.value}>
                    <input
                        type="checkbox"
                        value={option.value}
                        name="preferred-modes"
                        onChange={(e) => setMode(e.target.value as (keyof modesType))}
                        // onChange={(e) => showEValue(e.target.value)}
                        checked={modes[option.value]}
                    />
                    {option.text}
                </label>
            ))}
        </div>
    );
};

export default Mode;

// &al=1&shin=1&ex=1&hb=1&lb=1&sr=1
