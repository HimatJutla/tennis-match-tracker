import { Match } from "@/interfaces/match/match.interface";
import { Player } from "@/interfaces/player/player.interface";

export interface FindPlayerPageProps {
    players: Array<Player>;
    matches: Array<Match>;
}

