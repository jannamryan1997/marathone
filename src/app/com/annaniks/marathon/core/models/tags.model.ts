export interface Tag{
    "url": string,
    "name": string,
    "category": string
}
export interface FilterTag{
    type:string,
    tags:string[]
}
export interface Category{
    "url":  string,
    "name": string,
    "title": string
}