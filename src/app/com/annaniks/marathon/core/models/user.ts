export interface UserResponseData {
    data: {
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
        facebook: string,
        youtube: string,
        instagram: string,
        linkedin: string,
        language:Country[];
        certificates:CertificatesData[],
        education:EducationData [],
        experience: ExperienceData[],
        speciality:any;
    }
}


interface CertificatesData{
    description: string,
    file: string,
}

export interface ExperienceData{
    name: string,
    specialization: string,
    start_date: string,
    end_date: string
}

export interface EducationData{
    name: string,
    specialization: string,
    start_date: string,
    end_date: string,
}

interface User{
    email: string;
    first_name: string;
    last_name: string;
    password: string;
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