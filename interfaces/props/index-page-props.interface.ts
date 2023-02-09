import { Match } from "../match.interface";
import { Player } from "../player.interface";

export interface IndexPagePropsInterface {
    matches: Array<Match>;
    players: Array<Player>;
}