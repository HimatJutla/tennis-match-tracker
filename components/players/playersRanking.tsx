import { Match } from '@/interfaces/match/match.interface';
import { Player } from '@/interfaces/player/player.interface';
import { PlayersRankingComponentProps } from '@/interfaces/props/component-props/players-ranking-component-props.interface';
import { useEffect, useState } from 'react';
import EmptyState from '../ui/emptyState/emptyState';
import styled from 'styled-components';


const PlayerDetailsCardStyling = styled.div`
    .player-rank-block {
        padding: 2% 4%;
        border-radius: 1%;
        background-color: white;
    }
    .rank-stats-block {
        font-size: .8rem;
    }
    .img-block {
        width: 15%;
    }
    .player-name-block {
        width: 50%;
        border-bottom: 2px solid green;
    }
    .unranked-players-block {
        margin-top: 11%;
    }
`;


function PlayersRanking({players, matches}: PlayersRankingComponentProps) {
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
        <PlayerDetailsCardStyling>                  
            {
                rankedPlayers?.length ?
                rankedPlayers.map((player: Player, index: number) => (
                    <div className="mb-2 player-rank-block" key={index + 1}>
                        <div
                            className="flex items-center">
                            <div
                                className="img-block mr-3">
                                <img src={player?.image} width="75" />
                            </div>
                            <div
                                className="player-name-block mr-5">
                                <div
                                    className="large-text">
                                    <strong>{index + 1}</strong>
                                </div>
                                <div>
                                    <span>{player?.country?.flag}</span> {player?.firstName} {player?.lastName}
                                </div>
                            </div>
                            <div
                                className="rank-stats-block">
                                <div>
                                    <div>
                                        Wins: {player?.wins}
                                    </div>
                                    <div>
                                        Losses: {player?.losses}
                                    </div>
                                    <div>
                                        Matches Played: {player?.totalMatches}
                                    </div>
                                    <div>
                                        Win Percent: {player?.winningPercentage.toFixed(2)}%
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))
                :
                <div>Sorry, there are currently no ranked players to be displayed</div>
            }
            {
                unrankedPlayers?.length &&
                <div
                    className="unranked-players-block">
                    <div
                        className="white-text large-text mb-4">
                        UNRANKED PLAYERS
                    </div>
                    {unrankedPlayers.map((player: Player, index: number) => (
                    <div className="mb-2 player-rank-block" key={index + 1}>
                        <div
                            className="flex items-center">
                            <div
                                className="img-block mr-3">
                                <img src={player?.image} width="75" />
                            </div>
                            <div
                                className="player-name-block mr-5">
                                <div
                                    className="large-text v-hidden">
                                    <strong>{index + 1}</strong>
                                </div>
                                <div>
                                    <span>{player?.country?.flag}</span> {player?.firstName} {player?.lastName}
                                </div>
                            </div>
                            <div
                                className="rank-stats-block">
                                <div>
                                    <div>
                                        Wins: 0
                                    </div>
                                    <div>
                                        Losses: 0
                                    </div>
                                    <div>
                                        Matches Played: 0
                                    </div>
                                    <div>
                                        Win Percent: 0%
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))
                }
                </div>
            }
        </PlayerDetailsCardStyling>
    );
}

export default PlayersRanking;