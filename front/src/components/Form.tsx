import { FormPropsType } from "../types";
import Query from "./Query";

const Form = ({ viaCount, setViaCount, query, handleSubmit }: FormPropsType) => {
    return (
        <div>
            <Query viaCount={viaCount} setViaCount={setViaCount} query={query} handleSubmit={handleSubmit} />
            <button form="search" type="submit">検索</button>
        </div>
    );
};

export default Form;
