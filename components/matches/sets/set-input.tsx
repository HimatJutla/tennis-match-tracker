import { SetInputComponentPropsInterface } from '@/interfaces/props/component-props/set-input-component-props.interface';
import { useEffect, useState } from 'react';
import styled from 'styled-components';


const SetInputStyling = styled.div`
`;

export default function SetInput({playerOne, playerTwo, setNumber, passScoreUpToParent}: SetInputComponentPropsInterface): any {

    const [playerOneScore, setPlayerOneScore] = useState(0);
    const [playerTwoScore, setPlayerTwoScore] = useState(0);

    // Handlers

    const onSetPlayerOneScoreHandler = (event: any): void => {
        setPlayerOneScore(event.target.value);
    }

    const onSetPlayerTwoScoreHandler = (event: any): void => {
        setPlayerTwoScore(event.target.value);
    }

    // Effects
    useEffect(() => {
        if ((playerOneScore || playerTwoScore) && setNumber) {
            passScoreUpToParent(playerOneScore, playerTwoScore, setNumber);
        }
    }, [playerOneScore, playerTwoScore]);


    if (playerOne && playerTwo && setNumber) {
        return (
            <>
                <SetInputStyling>
                    <label htmlFor={'set'+setNumber}>Set {setNumber}</label>
                    <div
                        className="set-input-block">
                            <div
                                className="player-score-block">
                                <label htmlFor="playerOneScore">{playerOne.firstName} {playerOne.lastName}</label>
                                <input type='number' min="0" max="7" required id='playerOneScore' value={playerOneScore} onChange={onSetPlayerOneScoreHandler} />
                            </div>
                            <div
                                className="player-score-block">
                                <label htmlFor="playerTwoScore">{playerTwo.firstName} {playerTwo.lastName}</label>
                                <input type='number' min="0" max="7" required id='playerTwoScore' value={playerTwoScore} onChange={onSetPlayerTwoScoreHandler} />
                            </div>
                    </div>
                </SetInputStyling>
            </>
          )
    }
}
