import { Player } from "@/interfaces/player/player.interface";

export interface SetInputComponentPropsInterface {
    playerOne: Player;
    playerTwo: Player;
    setNumber: number;
    passScoreUpToParent: Function;
}