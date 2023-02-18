import { Match } from '@/interfaces/match/match.interface';
import { Player } from '@/interfaces/player/player.interface';
import { PlayersRankingComponentProps } from '@/interfaces/props/component-props/players-ranking-component-props.interface';
import { useEffect, useState } from 'react';
import EmptyState from '../ui/emptyState/emptyState';

function PlayersRanking({players, matches}: PlayersRankingComponentProps) {
// NTS NEED TO RELOAD MATCH DATA AFTER CRUD
    const [rankedPlayers, setRankedPlayers] = useState(players);
    const [unrankedPlayers, setUnrankedRankedPlayers] = useState(players);

    const filterHeadToHeadMatches = ((playerOne: Player, playerTwo: Player): Array<Match> => {
        let filteredHeadToHeadMatches: Array<Match> = [];
        const playerOneMatches = matches.filter((match: Match) => {
            return match.playerOne.id === playerOne.id || match.playerTwo.id === playerOne.id;
        });
        if (playerOneMatches.length) {
            filteredHeadToHeadMatches = playerOneMatches.filter((match: Match) => {
                return match.playerOne.id === playerTwo.id || match.playerTwo.id === playerTwo.id;
            });
        }
        return filteredHeadToHeadMatches;
    });

    const determineTieBreakWinner = ((playerOne: Player, playerTwo: Player): Player => {
        const filteredHeadToHeadMatches = filterHeadToHeadMatches(playerOne, playerTwo);
        if (!filteredHeadToHeadMatches.length) {
            return playerOne;
        }
        const playerOneWins = filteredHeadToHeadMatches.filter((match: Match) => {
            return match.winner.id === playerOne.id;
        });
        const playerTwoWins = filteredHeadToHeadMatches.filter((match: Match) => {
            return match.winner.id === playerTwo.id;
        });
        const winner = playerOneWins > playerTwoWins ? playerOne : playerTwo;
        return winner;
    });

    const rankPlayers = (playersToRank: Array<Player>): Array<Player> => {
        const playersRankedByWins = playersToRank.sort((a: Player, b: Player) => {
            if (b?.wins - a?.wins === 0) {
                console.log('happened', a, b);
                const winner = determineTieBreakWinner(a, b);
                if (winner == a) {
                    return -1;
                }
                return 1;
            }
            return b?.wins - a?.wins;
        });
        return playersRankedByWins;
    }

    useEffect(() => {
        console.log(players);
        const playersWhoCanBeRanked: Array<Player> = [];
        const playersWhoCannotBeRanked: Array<Player> = [];
        players.forEach((player: Player) => {
            if (player.totalMatches > 0) {
                playersWhoCanBeRanked.push(player);
            } else {
                playersWhoCannotBeRanked.push(player);
            }
        });
        setUnrankedRankedPlayers(playersWhoCannotBeRanked);
        const playersRankedByWins = rankPlayers(playersWhoCanBeRanked);
        setRankedPlayers(playersRankedByWins);
        console.log('RANKED', rankedPlayers);
        console.log('UNRANKED', unrankedPlayers);
    }, [players, matches]);


    if (!matches?.length) {
        return (
            <>
                <div>
                    <EmptyState pluralizedEmptyItem="matches" singularEmptyItem="match" navLink="/player/new" />
                </div>
            </>
        )
    }

    if (players?.length < 2) {
        return (
            <>
                <div>
                    Sorry, there are less than two players in the system. Ranking cannot be performed.
                </div>
            </>
        )
    }

    return (
        <>
            {
                rankedPlayers?.length ?
                <div>{rankedPlayers[0].firstName}</div>
                :
                <div>Sorry, there are currently no ranked players to be displayed</div>
            }
            {
                unrankedPlayers?.length &&
                <div>{unrankedPlayers[0].firstName}</div>
            }
        </>
    );
}

export default PlayersRanking;