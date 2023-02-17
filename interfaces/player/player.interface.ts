export interface Player {
    id: string;
    firstName: string;
    lastName: string;
    dateOfBirth: string;
    bio: string;
    wins?: number;
    losses?: number;
    winningPercentage?: number;
    country: string;
    city: string;
    email: string;
    image?: string;
}