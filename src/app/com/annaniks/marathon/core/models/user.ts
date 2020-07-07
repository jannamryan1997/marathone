export interface UserResponseData {
    data: {
        avatar: string;
        google_id: any;
        about:string;
        id: number;
        metric: string;
        ui_language: any;
        url: string;
        status:string;
        locationLocality:any;
        user: {
            email: string;
            first_name: string;
            last_name: string;
            password: string;
        }
        message: string;

    }
}