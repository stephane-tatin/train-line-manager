import { StationStop } from "./station-stop.model";

export const trainTypes = ["fast", "regional"]
export type TrainType = typeof trainTypes[number]

export interface Train {
    id: number,
    number: string,
    departure: string;
    departureTime: string;
    departureDate: string;
    arrival: string;
    arrivalTime: string;
    arrivalDate: string
    stationsStops: string[];
    type: TrainType;
}