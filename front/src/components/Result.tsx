import ErrorMessage from "./ErrorMessage"
import RouteResult from "./RouteResult";
import { ErrorType } from "../types";

type ResultPropType = {
    error: ErrorType,
    result: any
}

const Result = ({error, result}: ResultPropType) => {
    console.log(error.status);  // Test
    
    return (
        <div className="result-container">
            {error.status ? <ErrorMessage message={error.message} /> : <RouteResult results={result} />}
        </div>
    );
};

export default Result;
