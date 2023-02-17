import { Player } from '@/interfaces/player/player.interface';
import { PlayersRankingComponentProps } from '@/interfaces/props/component-props/players-ranking-component-props.interface';
import { useEffect, useState } from 'react';
import EmptyState from '../ui/emptyState/emptyState';

function PlayersRanking({players, matches}: PlayersRankingComponentProps) {

    const [rankedPlayers, setRankedPlayers] = useState(players);

    const determinePlayersRank = (playersToRank: Array<Player>): Array<Player> => {
        // do a reduce method here
        // const sortedPlayers = playersToRank.sort((a, b) => {

        // });
        return playersToRank;
    }

    useEffect(() => {
        const sortPlayersByRank = determinePlayersRank(rankedPlayers);
    }, []);


    if (!players?.length) {
        return (
            <>
                <div>
                    <EmptyState emptyItem="player" navLink="/player/new"/>
                </div>
            </>
        )
    }

    return (
        <>
            {}
        </>
    );
}

export default PlayersRanking;