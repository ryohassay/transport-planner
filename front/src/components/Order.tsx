type OrderPropsType = {
    order: number | null,
    setOrder: React.Dispatch<React.SetStateAction<number | null>>,
}

type radioOptionType = {
    value: number,
    text: string,
}

const Order = ({ order, setOrder }: OrderPropsType) => {
    const radioOptions: radioOptionType[] = [
        {value: 0, text: "到着順"}, 
        {value: 1, text: "乗換回数順"}, 
        {value: 2, text: "料金順"}, 
    ];
    
    return (
        <div className="display-order-container">
           {radioOptions.map((option) => (
                <label key={option.value} className="option-label">
                    <input
                        type="radio"
                        value={option.value}
                        checked={order === option.value}
                        name="display-order"
                        onChange={() => setOrder(option.value)}
                    />
                    {option.text}
                </label>
            ))}
        </div>
    );
};

export default Order;
