export interface AllowedStops {
    [departure: string]: {
        [arrival: string]: string []
    }
}