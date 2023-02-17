import { Country } from "./country/country";

export interface Player {
    id: string;
    firstName: string;
    lastName: string;
    dateOfBirth: string;
    bio: string;
    wins: number;
    losses: number;
    totalMatches: number;
    winningPercentage: number;
    country: Country;
    city: string;
    email: string;
    image?: string;
}