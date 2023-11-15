import { useState } from "react"
import Page from "./Page";
import RouteButton from "./RouteButton";
import { ResultType } from "../types";

type RouteResultPropsType = {
    results: ResultType[],
}

const RouteResult = ({ results }: RouteResultPropsType) => {
    const [selected, setSelected] = useState<number>(0);

    return (
        <div className="route-results-container">
            {results.map((result, i) => (
                <div className="route-result" key={i}>
                    <div className="subtitle">
                        {result.origin}&ensp;→&ensp;{result.dest}
                    </div>

                    <div className="contents">
                        <RouteButton isLeft={true} selected={selected} setSelected={setSelected} size={result.pages.length}/>

                        <div className="pages-wrapper">
                            <div className="pages" style={{transform: `translateX(${- selected * 100}%)`}}>
                                {result.pages.map((page, j) => (
                                    <Page page={page} key={j}/>
                                ))}
                            </div>
                        </div>

                        <RouteButton isLeft={false} selected={selected} setSelected={setSelected} size={result.pages.length}/>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default RouteResult;
