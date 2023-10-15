import { useState } from "react"
import "react-datetime/css/react-datetime.css";
import './App.css';
import Form from "./components/Form";
import { TimeSpecType, ViaType, ViaListType, QueryType } from "./types";

function App() {
    // const [queries, setQueries] = useState<FormPropsType>();
    const [viaCount, setViaCount] = useState<number>(0);

    const [origin, setOrigin] = useState<string>("");
    const [destination, setDestination] = useState<string>("");
    const [datetime, setDatetime] = useState<Date>(new Date());
    const [timeSpec, setTimeSpec] = useState<TimeSpecType>("departure");
    const [via, setVia] = useState<ViaType>();
    const [vias, setVias] = useState<ViaListType>(["", "", ""]);

    const query: QueryType = {
        origin: origin,
        setOrigin: setOrigin,
        destination: destination,
        setDestination: setDestination,
        datetime: datetime,
        setDatetime: setDatetime,
        timeSpec: timeSpec,
        setTimeSpec: setTimeSpec,
        vias: vias,
        setVias: setVias,
    };

    const handleSubmit= (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log("e", (e.target as any).via0)
    };
    
    return (
        <div className="App">
            <Form viaCount={viaCount} setViaCount={setViaCount} query={query} handleSubmit={handleSubmit} />
        </div>
    );
}

export default App;
