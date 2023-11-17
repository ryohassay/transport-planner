type RouteButtonType = {
    isLeft: boolean,  // True: left, false: right
    selectedIndeces: number[],
    setSelectedIndeces: React.Dispatch<React.SetStateAction<number[]>>,
    index: number,
    size: number,
}

const RouteButton = ({ isLeft, selectedIndeces, setSelectedIndeces, index, size }: RouteButtonType) => {
    const onClick = () => {
        if(isLeft){
            setSelectedIndeces(
                selectedIndeces.map((selectedIndex, i) => (i === index ? selectedIndex - 1 : selectedIndex))
            );
        }
        else{
            setSelectedIndeces(
                selectedIndeces.map((selectedIndex, i) => (i === index ? selectedIndex + 1 : selectedIndex))
            );
        }
    };

    // console.log(isLeft, selectedIndeces, size); // Test

    return (
        <button
            className="page-button"
            onClick={onClick}
            disabled={(isLeft && selectedIndeces[index] === 0) || (!isLeft && selectedIndeces[index] >= size - 1)}
        >
            {isLeft ? "<" : ">"}
        </button>
    );
};

export default RouteButton;
