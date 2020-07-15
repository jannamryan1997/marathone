export interface Country {
    count: 1
    next: null,
    previous: null,
    results: Results[];
}

export interface Results {
    code: string,
    flag: string,
    name: string,
    url: string,
}
