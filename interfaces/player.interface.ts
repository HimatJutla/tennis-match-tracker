export interface Player {
    id: string;
    firstName: string;
    lastName: string;
    dateOfBirth: string;
    bio: string;
    wins: number;
    losses: number;
    country: string;
    city: string;
    email: string;
    image?: any; // NTS, change this when you know what data type exactly mongo uses with image
}