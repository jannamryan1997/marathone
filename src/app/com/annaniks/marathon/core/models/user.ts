export interface UserResponseData {
    data: UserData
}
export interface UserData {
    user: User,
    status: string,
    locationLocality: any,
    locationCountry: any,
    location: string;
    google_id: string,
    about: string,
    rate: any,
    ui_language: any,
    avatar: string,
    cover: string;
    facebook: string,
    youtube: string,
    instagram: string,
    linkedin: string,
    language: Country[];
    certificates: CertificatesData[],
    education: EducationData[],
    experience: ExperienceData[],
    speciality: any;
    slug: string;
    is_faworit: null | boolean;
    is_follower: boolean;
    is_follower_id: boolean;
}

interface CertificatesData {
    description: string,
    file: string,
    url?: string;
}

export interface ExperienceData {
    name: string,
    specialization: string,
    start_date: string,
    end_date: string,
    url?: string;
}

export interface EducationData {
    name: string,
    specialization: string,
    start_date: string,
    end_date: string,
    url?: string,
}

interface User {
    email: string;
    first_name: string;
    last_name: string;
    password: string;
}
export interface FamiliarData {
    client: Familiar[];
    coach: Familiar[];
}
export interface Familiar {
    avatar: string;
    certificates: [];
    cover: null;
    education: [];
    experience: [];
    facebook: null;
    google_id: null;
    id: number;
    instagram: null;
    is_faworit: boolean;
    is_follower: boolean;
    is_follower_id: number;
    language: [];
    linkedin: null;
    location: null;
    metric: string;
    role?: string;
    slug: string;
    speciality: [];
    status: null;
    ui_language: string;
    url: string;
    youtube: null;
    user: User;
}
export interface Country {
    count: 1
    next: null
    previous: null
    results: Results[];
}

export interface Results {
    lat: number,
    lng: number,
    name: string,
    url: string,
}