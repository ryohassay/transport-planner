import { NUM_ROUTES } from "../consts";

type RouteButtonType = {
    isLeft: boolean,  // True: left, false: right
    selected: number,
    setSelected: React.Dispatch<React.SetStateAction<number>>,
    size: number,
}

// const RouteButton = ({ selected, setSelected, size }: RouteButtonType) => {
//     const texts: string[] = [];
//     for(let i = 0; i < size; i++){
//         texts.push("経路" + (i + 1));
//     }

//     return (
//         <div className="button-container">
//             {texts.map((text, i) => 
//                 <label key={i} className="button">
//                     {text}
//                     <input 
//                         id={"route-button-" + i}
//                         name="route-button"
//                         type="radio"
//                         checked={selected === i}
//                         onChange={() => setSelected(i)}
//                     />
//                 </label>
                
//             )}
//         </div>
//     );
// };

const RouteButton = ({ isLeft, selected, setSelected, size }: RouteButtonType) => {
    const onClick = () => {
        if(isLeft){
            setSelected(prev => prev - 1);
        }
        else{
            setSelected(prev => prev + 1);
        }
    };

    console.log(isLeft, selected, size); // Test

    return (
        <button
            className="page-button"
            onClick={onClick}
            disabled={(isLeft && selected === 0) || (!isLeft && selected >= size - 1)}
        >
            {isLeft ? "<" : ">"}
        </button>
    );
};

export default RouteButton;
