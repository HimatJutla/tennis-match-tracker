import { Player } from '@/interfaces/player/player.interface';
import { PlayerListComponentPropsInterface } from '@/interfaces/props/component-props/player-list-component-props.interface';
import { SetInputComponentPropsInterface } from '@/interfaces/props/component-props/set-input-component-props.interface';
import { useState } from 'react';
import styled from 'styled-components';


const SetInputStyling = styled.div`
`;

export default function SetInput({playerOne, playerTwo, setNumber}: SetInputComponentPropsInterface): any {

    console.log(playerOne, playerTwo, setNumber);

    const [playerOneScore, setPlayerOneScore] = useState(0);
    const [playerTwoScore, setPlayerTwoScore] = useState(0);

    // Handlers

    const onSetPlayerOneScoreHandler = (event: any): void => {
        setPlayerOneScore(event.target.value);
    }

    const onSetPlayerTwoScoreHandler = (event: any): void => {
        setPlayerTwoScore(event.target.value);
    }


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
                                <input type='number' required id='playerOneScore' value={playerOneScore} onChange={onSetPlayerOneScoreHandler} />
                            </div>
                            <div
                                className="player-score-block">
                                <label htmlFor="playerTwoScore">{playerTwo.firstName} {playerTwo.lastName}</label>
                                <input type='number' required id='playerTwoScore' value={playerTwoScore} onChange={onSetPlayerTwoScoreHandler} />
                            </div>
                    </div>
                </SetInputStyling>
            </>
          )
    }
}
