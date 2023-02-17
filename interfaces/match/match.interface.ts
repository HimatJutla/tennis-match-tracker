import { MatchScore } from "./match-score.interface";
import { Player } from "../player/player.interface";
export interface Match {
    id?: string;
    playerOne: Player;
    playerTwo: Player;
    winner: Player;
    date: string;
    score: MatchScore;
    city: string;
    location?: string;
    image?: string;
}
