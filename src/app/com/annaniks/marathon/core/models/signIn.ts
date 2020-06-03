export interface SignInResponse {
    access: string,
    refresh: string,
}

export interface SignInData {
        username: string,
        password: string,
}