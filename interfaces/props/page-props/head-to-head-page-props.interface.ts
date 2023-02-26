import { Match } from "@/interfaces/match/match.interface";
import { Player } from "@/interfaces/player/player.interface";

export interface HeadToHeadPagePropsInterface {
    players: Array<Player>;
    matches: Array<Match>;
}
