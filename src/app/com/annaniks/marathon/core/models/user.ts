export interface UserResponseData {
    data: {
        avatar: string;
        google_id: any;
        id: number;
        metric: string;
        ui_language: string;
        url: string;
        user: {
            email: string;
            first_name: string;
            last_name: string;
            password: string;
        }
        message: string;

    }
}