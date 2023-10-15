export type FormType = {
    viaCount: number, 
    setViaCount: React.Dispatch<React.SetStateAction<number>>,
    query: QueryType,
}

export type TimeSpecType = "departure" | "arrival" | "first" | "last" | "none"

export type ViaType = string | undefined

export type ViaListType = ViaType[]

export type ViaPropsType = {
    viaCount: number, 
    setViaCount: React.Dispatch<React.SetStateAction<number>>, 
    vias: ViaListType,
    setVias: React.Dispatch<React.SetStateAction<ViaListType>>
}

export type QueryType = {
    origin: string,
    setOrigin: React.Dispatch<React.SetStateAction<string>>,
    destination: string,
    setDestination: React.Dispatch<React.SetStateAction<string>>,
    datetime: Date,
    setDatetime: React.Dispatch<React.SetStateAction<Date>>,
    timeSpec: TimeSpecType,
    setTimeSpec: React.Dispatch<React.SetStateAction<TimeSpecType>>,
    vias: ViaListType,
    setVias: React.Dispatch<React.SetStateAction<ViaListType>>,
}

export type FormPropsType = {
    viaCount: number, 
    setViaCount: React.Dispatch<React.SetStateAction<number>>,
    query: QueryType,
    handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void,
}
