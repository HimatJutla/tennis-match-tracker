import { Player } from "@/interfaces/player/player.interface";

export interface PlayerListComponentPropsInterface {
    passedPlayers: Array<Player>;
    labelText?: string;
    selectId?: string;
    passCurrentPlayerToParent?: Function;
    playerNumber?: number;
    defaultPlayer?: Player;
    blackTextLabel?: boolean;
}