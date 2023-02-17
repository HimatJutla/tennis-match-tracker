import { Match } from "@/interfaces/match/match.interface";
import { Player } from "@/interfaces/player/player.interface";

export interface HeadToHeadComparisonComponentPropsInterface {
    playerOne: Player;
    playerTwo: Player;
    headToHeadMatches: Array<Match>;
}