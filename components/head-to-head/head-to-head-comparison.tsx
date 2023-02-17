import { Match } from "@/interfaces/match/match.interface";
import { HeadToHeadComparisonComponentPropsInterface } from "@/interfaces/props/component-props/head-to-head-comparison-component-props.interface";
import { useEffect, useState } from "react";
import styled from 'styled-components';
import MatchesList from "../matches/matchesList";


const HeadToHeadComponentStyling = styled.div`
  .head-to-head-player-first-name {
    font-weight: 600;
    font-size: 1.5em;
  }
  .head-to-head-player-last-name {
    font-weight: 600;
    font-size: 2.5em;
  }
`;

export default function HeadToHeadComparison({playerOne, playerTwo, headToHeadMatches}: HeadToHeadComparisonComponentPropsInterface) {

    const [playerOneWins, setPlayerOneWins] = useState(0);
    const [playerOneWinningPercentage, setPlayerOneWinningPercentage] = useState(0);
    const [playerTwoWins, setPlayerTwoWins] = useState(0);
    const [playerTwoWinningPercentage, setPlayerTwoWinningPercentage] = useState(0);
    const [headToHeadString, setHeadToHeadString] = useState('');

    const generateHeadToHeadString = (headToHeadPlayerOneWins: Array<Match>, headToHeadPlayerTwoWins: Array<Match>): string => {
        let headToHeadString = '';
        if (headToHeadPlayerOneWins.length !== headToHeadPlayerTwoWins.length) {
            headToHeadString = headToHeadPlayerOneWins.length > headToHeadPlayerTwoWins.length ? `${playerOne.firstName} ${playerOne.lastName} leads head to head by ${headToHeadPlayerOneWins.length} - ${headToHeadPlayerTwoWins.length}`
            : `${playerTwo.firstName} ${playerTwo.lastName} leads head to head by ${headToHeadPlayerTwoWins.length} - ${headToHeadPlayerOneWins.length}`;
        } else if (headToHeadPlayerOneWins.length === headToHeadPlayerTwoWins.length && headToHeadPlayerOneWins.length > 0 && headToHeadPlayerTwoWins.length > 0) {
            headToHeadString = `${playerOne.firstName} ${playerOne.lastName} and ${playerTwo.firstName} ${playerTwo.lastName} are currently tied at ${headToHeadPlayerOneWins.length} games each`;
        } else {
            headToHeadString =  `${playerOne.firstName} ${playerOne.lastName} and ${playerTwo.firstName} ${playerTwo.lastName} have never played each other`;
        }
        return headToHeadString;
    }

    const calculatePlayerWinningPercentage = (playerWins: number, totalMatches: number): number => {
        if (playerWins == 0) {
            return 0;
        }
        return (playerWins / totalMatches)*100;
    }

    const calculateAndSetHeadToHeadData = (): void => {
        const headToHeadPlayerOneWins = headToHeadMatches.filter((match: Match) => {
            return match.winner.id === playerOne.id;
        });
        const headToHeadPlayerTwoWins = headToHeadMatches.filter((match: Match) => {
            return match.winner.id === playerTwo.id;
        });
        const playerOneWinningPercentage = calculatePlayerWinningPercentage(headToHeadPlayerOneWins?.length, headToHeadMatches?.length);
        const playerTwoWinningPercentage = calculatePlayerWinningPercentage(headToHeadPlayerTwoWins?.length, headToHeadMatches?.length);
        const headToHeadString = generateHeadToHeadString(headToHeadPlayerOneWins, headToHeadPlayerTwoWins);
        setPlayerOneWins(headToHeadPlayerOneWins?.length);
        setPlayerOneWinningPercentage(playerOneWinningPercentage);
        setPlayerTwoWins(headToHeadPlayerTwoWins?.length);
        setPlayerTwoWinningPercentage(playerTwoWinningPercentage);
        setHeadToHeadString(headToHeadString);
    }

    useEffect(()=> {
        calculateAndSetHeadToHeadData();
    }, [headToHeadMatches]);

    return (
        <HeadToHeadComponentStyling>
            <div
                className='title-container'>
                {playerOne?.firstName.toUpperCase()} {playerOne?.lastName.toUpperCase()} VS {playerTwo?.firstName.toUpperCase()} {playerTwo?.lastName.toUpperCase()}
            </div>
            <div
                className='flex items-center justify-center mb-3'>
                <div>
                    <div
                        className='flex items-center mb-2'>
                        <img height="200" width="200" src={playerOne?.image} alt="Image of Player One" />
                        <div className="ml-5">
                        <div>
                            WINS:
                        </div>
                        <div>
                            {playerOneWins}
                        </div>
                        <div>
                            {playerOneWinningPercentage.toFixed(2)}%
                        </div>
                    </div>
                    </div>
                    <div>
                        <div className="head-to-head-player-first-name">
                            {playerOne?.firstName.toUpperCase()}
                        </div>
                        <div className="head-to-head-player-last-name">
                            {playerOne?.lastName.toUpperCase()}
                        </div>
                    </div>
                </div>
                <div
                    className='mx-20'>
                    VS
                </div>
                <div>
                    <div
                        className='flex items-center mb-2'>
                        <img height="200" width="200" src={playerTwo?.image} alt="Image of Player Two" />
                        <div className="ml-5">
                            <div>
                                WINS:
                            </div>
                            <div>
                                {playerTwoWins}
                            </div>
                            <div>
                                {playerTwoWinningPercentage.toFixed(2)}%
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className="head-to-head-player-first-name">
                            {playerTwo?.firstName.toUpperCase()}
                        </div>
                        <div className="head-to-head-player-last-name">
                            {playerTwo?.lastName.toUpperCase()}
                        </div>
                    </div>
                </div>
            </div>
            <div
                className='flex items-center justify-center mb-5'>
                {headToHeadString}
            </div>
            {headToHeadMatches?.length ?
            <>
                <div
                    className="title-container mb-3">
                    MATCHES:
                </div>
                <MatchesList matches={headToHeadMatches} />
            </>
            :
            <div>
                No matches to display
            </div>
            }
        </HeadToHeadComponentStyling>
    )
}