type ResultType = {
    results: any,
}

const RouteResult = ({results}: ResultType) => {
    return (
        <div className="route-result">
            {JSON.stringify(results)}
        </div>
    );
};

export default RouteResult;
