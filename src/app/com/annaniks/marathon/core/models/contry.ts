export interface Country {
    count: 1
    next: null
    previous: null
    results: Results[];
}

export interface Results {
    lat: number,
    lng: number,
    name: string,
    url: string,
}
