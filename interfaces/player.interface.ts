export interface Player {
    id: string;
    firstName: string;
    lastName: string;
    dateOfBirth: string;
    description: string;
    wins: number;
    losses: number;
    country: string;
    city: string;
    image?: any; // NTS, change this when you know what data type exactly mongo uses with image
}