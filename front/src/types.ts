// export type modesType = {
//     al: 0 | 1,
//     shin: 0 | 1,
//     ex: 0 | 1,
//     hb: 0 | 1,
//     lb: 0 | 1,
//     sr: 0 | 1,
// }

export type modesType = {
    al: boolean,
    shin: boolean,
    ex: boolean,
    hb: boolean,
    lb: boolean,
    sr: boolean,
}

export type FormType = {
    viaCount: number, 
    setViaCount: React.Dispatch<React.SetStateAction<number>>,
    query: QueryType,
}

export type TimeSpecType = "departure" | "arrival" | "first" | "last" | "none"

export type ViaType = string | undefined

export type ViaListType = ViaType[]

export type RouteType = {
    index: number | null,
    origin: string,
    destination: string,
    datetime: Date,
    timeSpec: TimeSpecType,
    waypointIds: number[],
}

export type optionsType = {
    modes: modesType,
    setModes: React.Dispatch<React.SetStateAction<modesType>>,
    speed: number | null,
    setSpeed: React.Dispatch<React.SetStateAction<number | null>>,
    order: number | null,
    setOrder: React.Dispatch<React.SetStateAction<number | null>>,
}

export type QueryType = {
    viaCount: number,
    setViaCount: React.Dispatch<React.SetStateAction<number>>,
    routes: RouteType[],
    setRoutes: React.Dispatch<React.SetStateAction<RouteType[]>>,
    options: optionsType,
}

export type WaypointType = {
    id: number,
    text: string,
    parentId: number,
}

export type FormPropsType = {
    viaCount: number, 
    setViaCount: React.Dispatch<React.SetStateAction<number>>,
    query: QueryType,
    handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void,
}

export type RoutePropsType ={
    index: number,
    routes: RouteType[];
    setRoutes: React.Dispatch<React.SetStateAction<RouteType[]>>;
    waypoints: WaypointType[];
    setWaypoints: React.Dispatch<React.SetStateAction<any[]>>,
}
