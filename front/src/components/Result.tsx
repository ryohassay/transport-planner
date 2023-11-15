import ErrorMessage from "./ErrorMessage"
import RouteResult from "./RouteResult";
import { ErrorType, ResultType } from "../types";

type ResultPropType = {
    error: ErrorType,
    results: ResultType[],
}

const Result = ({ error, results }: ResultPropType) => {
    // console.log(error.status);  // Test
    
    return (
        <div className="result-container">
            {error.status ? <ErrorMessage message={error.message} /> : <RouteResult results={results} />}
        </div>
    );
};

export default Result;
