import { Match } from "../../match/match.interface";
import { Player } from "../../player/player.interface";

export interface MatchFormComponentProps {
    players: Array<Player>;
    matchToBeUpdated?: Match;
    onMatchFormComplete: Function;
}