import { useState, useEffect } from "react";
import { ResultType } from "../types";
import { DELAY_SEC } from "../consts";

type TotalFarePropsType = {
    results: ResultType[],
    selectedIndeces: number[],
}

const TotalFare = ({ results, selectedIndeces }: TotalFarePropsType) => {
    let total = 0;
    const size = results.length;
    for(let i = 0; i < size; i++){
        total += results[i].pages[selectedIndeces[i]].fare;
    }

    return (
        <div className="total-fare">
            合計運賃：{total}円
        </div>
    );
};

export default TotalFare;
