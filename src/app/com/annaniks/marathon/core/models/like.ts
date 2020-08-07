export interface LikeResponseData {
    count: number;
    next: boolean;
    previous: boolean;
    results: Results;
}

export interface Results {
    coach: string;
    feed: string;
    id: number;
    liked_coach: boolean;
    liked_user:LikeUser;
    url: string;
    user: null;
}

export interface LikeUser {
    avatar: string;
    cover: string;
    id: number;
    url: string;
    user: User;
}

export interface User {
    email: string;
    first_name: string;
    id: number;
    last_name: string;
    password: string;
}