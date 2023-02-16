import { Player } from "@/interfaces/player/player.interface";

export interface PlayerFormComponentProps {
    player?: Player;
    onPlayerFormComplete: Function;
}
