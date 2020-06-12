export interface SignInResponse {
    access: string,
    refresh: string,
    role:string;
}

export interface SignInData {
        username: string,
        password: string,
}