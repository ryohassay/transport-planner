import { useState } from "react"
import Page from "./Page";
import RouteButton from "./RouteButton";
import TotalFare from "./TotalFare";
import { ResultType } from "../types";

type RouteResultPropsType = {
    results: ResultType[],
}


const RouteResult = ({ results }: RouteResultPropsType) => {
    const [selectedIndeces, setSelectedIndeces] = useState<number[]>(new Array<number>(results.length).fill(0));
    
    return (
        <div className="route-results-container">
            {results.map((result, i) => (
                <div className="route-result" key={i}>
                    <div className="subtitle">
                        {result.origin}&ensp;→&ensp;{result.dest}
                    </div>

                    <div className="contents">
                        <RouteButton isLeft={true} selectedIndeces={selectedIndeces} setSelectedIndeces={setSelectedIndeces} index={i} size={result.pages.length}/>

                        <div className="pages-wrapper">
                            <div className="pages" style={{
                                transform: `translateX(${- selectedIndeces[i] * 100}%)`
                            }}>
                                {result.pages.map((page, j) => (
                                    <Page page={page} index={j} key={j}/>
                                ))}
                            </div>
                        </div>

                        <RouteButton isLeft={false} selectedIndeces={selectedIndeces} setSelectedIndeces={setSelectedIndeces} index={i} size={result.pages.length}/>
                    </div>
                </div>
            ))}

            {results.length === 0 ? "" : <TotalFare results={results} selectedIndeces={selectedIndeces}/>}
        </div>
    );
};

export default RouteResult;
