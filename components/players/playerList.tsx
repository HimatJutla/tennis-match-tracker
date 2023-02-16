import { Player } from '@/interfaces/player/player.interface';
import { PlayerListComponentPropsInterface } from '@/interfaces/props/component-props/player-list-component-props.interface';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import EmptyState from '../ui/emptyState/emptyState';


const PlayersListStyling = styled.div`
`;

export default function PlayerList({passedPlayers, labelText, selectId, passCurrentPlayerToParent, playerNumber, defaultPlayer}: PlayerListComponentPropsInterface) {

    const [currentPlayer, setCurrentPlayer] = useState(defaultPlayer ? defaultPlayer : null);

    const handleSetCurrentPlayer = (event: any) => {
        setCurrentPlayer(JSON.parse(event.target.value));
    };

    useEffect(() => {
        if (!passCurrentPlayerToParent || !playerNumber || !currentPlayer) {
            return;
        }
        passCurrentPlayerToParent(currentPlayer, playerNumber);
    
    }, [currentPlayer]);

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
                <EmptyState emptyItem="player" navLink="/player/new"/>
            </div>
        </>
    );
}
