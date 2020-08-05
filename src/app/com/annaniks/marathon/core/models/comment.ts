export interface Comment {
    coach: null;
    comment_sub: Comment[];
    crated_at: string;
    dislikes_count: number;
    feed: string;
    id: number;
    is_dis_liked: boolean;
    is_dis_liked_id: number;
    is_liked: boolean;
    is_liked_id: boolean;
    likes_count: number;
    message: string;
    parent: null;
    url: string;
    user: string;
    user_coach: Creator;
    comment_coach: Creator;
    isShowSubMessages?:boolean;
}
export interface Creator {
    avatar: null;
    id: number;
    url: string;
    user: {
        email: string;
        first_name: string;
        id: number;
        last_name: string;
        password: string;
    };
}
