import { Player } from '@/interfaces/player/player.interface';
import { PlayerListComponentPropsInterface } from '@/interfaces/props/component-props/player-list-component-props.interface';
import styled from 'styled-components';


const PlayersListStyling = styled.div`
`;

export default function PlayerList({passedPlayers, labelText, selectId, passCurrentPlayerToParent}: PlayerListComponentPropsInterface) {

    const handleSetCurrentPlayer = (event: any) => {
        if (!passCurrentPlayerToParent) {
            return;
        }
        passCurrentPlayerToParent(JSON.parse(event.target.value));
    };

    if (passedPlayers?.length) {
        return (
            <>
                <PlayersListStyling>
                <label htmlFor={selectId ? selectId : 'playerList'}>{labelText ? labelText : 'Select A Player'}</label>
                <select onChange={handleSetCurrentPlayer} id={selectId ? selectId : 'playerList'}>
                    {passedPlayers.map((player: Player) => (
                        <option
                            key={player.id}
                            id={player.id}
                            value={JSON.stringify(player)}>
                            {player?.firstName} &nbsp; {player?.lastName}
                        </option>
                    ))}
                </select>
                </PlayersListStyling>
            </>
          )
    }

    return (
        <>
            <div>
                Sorry, there are no players, click here to add a player.
            </div>
        </>
    );
}
