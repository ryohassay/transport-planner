import ErrorMessage from "./ErrorMessage"
import RouteResult from "./RouteResult";
import { ErrorType, ResultType } from "../types";

type ResultPropType = {
    error: ErrorType,
    result: ResultType[],
}

const Result = ({ error, result }: ResultPropType) => {
    console.log(error.status);  // Test
    
    return (
        <div className="result-container">
            {error.status ? <ErrorMessage message={error.message} /> : <RouteResult results={result} />}
        </div>
    );
};

export default Result;
