import { Player } from "./player.interface";
export interface Match {
    id: string;
    playerOne: Player;
    playerTwo: Player;
    winner: Player;
    date: string;
    playerOneScore: string;
    playerTwoScore: string;
    location?: string;
    image?: any; // NTS, change this when you know what data type exactly mongo uses with image
}
