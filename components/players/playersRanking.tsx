import { Player } from '@/interfaces/player/player.interface';
import { PlayersRankingComponentProps } from '@/interfaces/props/component-props/players-ranking-component-props.interface';
import { useEffect, useState } from 'react';
import EmptyState from '../ui/emptyState/emptyState';

function PlayersRanking({players, matches}: PlayersRankingComponentProps) {

    const [rankedPlayers, setRankedPlayers] = useState(players);

    const determinePlayersRank = (playersToRank: Array<Player>): Array<Player> => {
        return playersToRank;
    }

    useEffect(() => {
        const sortPlayersByRank = determinePlayersRank(rankedPlayers);
    }, [matches]);


    if (!players?.length) {
        return (
            <>
                <div>
                    <EmptyState pluralizedEmptyItem="players" singularEmptyItem="player" navLink="/player/new" />
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