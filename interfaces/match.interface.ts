import { MatchScore } from "./match-score.interface";
import { Player } from "./player.interface";
export interface Match {
    id: string;
    playerOne: Player;
    playerTwo: Player;
    winner: Player;
    date: string;
    score: MatchScore;
    city: string;
    location?: string;
    image?: any; // NTS, change this when you know what data type exactly mongo uses with image
}
