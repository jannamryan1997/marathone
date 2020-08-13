export interface SignUpData {
    slug?:string;
    user: {
        email: string,
        password: string,
        first_name: string,
    }
}

export interface SignUpResponse { }