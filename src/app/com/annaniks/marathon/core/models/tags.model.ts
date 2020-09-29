export interface Tag{
    "url": string,
    "name": string,
    "category": string
    "category_rel:":Category
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