import Page from "./Page";
import { ResultType } from "../types";

type RouteResultPropsType = {
    results: ResultType[],
}

const RouteResult = ({ results }: RouteResultPropsType) => {
    return (
        <div className="route-results-container">
            {results.map((result, i) => (
                <div className="route-result">
                    <div className="subtitle" key={i}>
                        {result.origin}&ensp;→&ensp;{result.dest}
                    </div>

                    {result.pages.map((page, i) => (
                        <Page page={page} />
                    ))}
                    
                </div>
            ))}
            
            {JSON.stringify(results)}
        </div>
    );
};

export default RouteResult;
