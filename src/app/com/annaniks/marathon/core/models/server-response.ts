export interface ServerResponse<T> {
    count: number;
    next: null
    previous: null
    results: T,
}