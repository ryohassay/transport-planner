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

export type RouteType = {
    origin: string,
    destination: string,
    datetime: Date,
    timeSpec: TimeSpecType,
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
    // id: number,
    text: string,
    // routeId: number,
}

export type IdSetType = {
    routeId: string,
    waypointIds: string[],
}

export type FormPropsType = {
    routes: RouteType[],
    setRoutes: React.Dispatch<React.SetStateAction<RouteType[]>>,
    waypoints: WaypointType[],
    setWaypoints: React.Dispatch<React.SetStateAction<WaypointType[]>>,
    modes: modesType,
    setModes: React.Dispatch<React.SetStateAction<modesType>>,
    speed: number | null,
    setSpeed: React.Dispatch<React.SetStateAction<number | null>>,
    order: number | null,
    setOrder: React.Dispatch<React.SetStateAction<number | null>>,
    handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void,
}

export type RoutePropsType ={
    routeIndex: number,
    routes: RouteType[];
    setRoutes: React.Dispatch<React.SetStateAction<RouteType[]>>;
    waypoints: WaypointType[];
    setWaypoints: React.Dispatch<React.SetStateAction<any[]>>,
}

export type WaypointPropsType ={
    routeIndex: number,
    waypoints: WaypointType[];
    setWaypoints: React.Dispatch<React.SetStateAction<any[]>>,
}
