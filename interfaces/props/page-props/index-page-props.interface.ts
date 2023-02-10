import { Match } from "../../match/match.interface";
import { Player } from "../../player/player.interface";

export interface IndexPagePropsInterface {
    matches: Array<Match>;
    players: Array<Player>;
}