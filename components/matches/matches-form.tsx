import { Player } from '@/interfaces/player/player.interface';
import { MatchFormComponentProps } from '@/interfaces/props/component-props/match-form-component-props.interface';
import { useEffect, useState } from 'react';
import PlayerList from '../players/playerList';
import styled from 'styled-components';
import SetInput from './sets/set-input';

const MatchesFormStyling = styled.div`
`;

function MatchesForm({players, matchToBeUpdated, onMatchFormComplete}: MatchFormComponentProps) {

    const [isEditMode, setIsEditMode] = useState(matchToBeUpdated ? true: false);
    const [playerOne, setPlayerOne] = useState(matchToBeUpdated ? matchToBeUpdated.playerOne : players[0]);
    const [playerTwo, setPlayerTwo] = useState(matchToBeUpdated ? matchToBeUpdated.playerTwo : players[1]);
    const [displaySetInputs, setDisplaySetInputs] = useState(false);
    const [winner, setWinner] = useState(matchToBeUpdated ? matchToBeUpdated.winner : '');
    const [numberOfSets, setNumberOfSets] = useState(matchToBeUpdated ? matchToBeUpdated.score.numberOfSets : 1);
    const [date, setDate] = useState(matchToBeUpdated ? matchToBeUpdated.date : '');
    const [score, setScore] = useState(matchToBeUpdated ? matchToBeUpdated.score : '');
    const [city, setCity] = useState(matchToBeUpdated ? matchToBeUpdated.city : '');
    const [location, setLocation] = useState(matchToBeUpdated ? matchToBeUpdated.location : '');
    const [image, setImage] = useState(matchToBeUpdated ? matchToBeUpdated.image : '');

    // Setter Handlers
    // const onSetPlayerOneHandler = (event: any): void => {
    //     setPlayerOne(event.target.value);
    // }
    // const onSetPlayerTwoHandler = (event: any): void => {
    //     setPlayerTwo(event.target.value);
    // }
    // const onSetWinnerHandler = (event: any): void => {
    //     setWinner(event.target.value);
    // }
    const onSetDateHandler = (event: any): void => {
        setDate(event.target.value);
    }
    const onSetNumberOfSetsHandler = (event: any): void => {
        setNumberOfSets(event.target.value);
    }
    const onSetScoreHandler = (event: any): void => {
        setScore(event.target.value);
    }
    const onSetCityHandler = (event: any): void => {
        setCity(event.target.value);
    }
    const onSetLocationHandler = (event: any): void => {
        setLocation(event.target.value);
    }

    const handlePlayerPassed = async (playerToBeUpdated: Player, playerNumber: number) => {
        console.log(playerToBeUpdated);
        playerNumber == 1 ? setPlayerOne(playerToBeUpdated) : setPlayerTwo(playerToBeUpdated);
    }

    const setShouldSetsBeDisplayedHandler = () => {
        console.log(playerOne, playerTwo, numberOfSets);
        if (playerOne && playerTwo && numberOfSets > 0) {
            setDisplaySetInputs(true);
            return;
        }
        setDisplaySetInputs(false);
    }

    const submitMatchHandler = (event: any): void => {
        event.preventDefault();
        const matchData = {};
       onMatchFormComplete(matchData);
    }

    // Utils
    const convertImageToBase64Handler = (imageUpload: any) => {
        const file = imageUpload.target.files[0];
        const reader = new FileReader();

        reader.onloadend = () => {
            if (reader.result) {
                setImage(reader.result.toString());
            }
        };
        reader.readAsDataURL(file)
    }

    // Effects
    useEffect(() => {
        setShouldSetsBeDisplayedHandler();
    }, [playerOne, playerTwo, numberOfSets]);

    return (
        <MatchesFormStyling>
            <form
                onSubmit={submitMatchHandler}>
                <div>
                    <PlayerList passedPlayers={players} selectId='playerOne' labelText="Player One" playerNumber={1} defaultPlayer={playerOne} passCurrentPlayerToParent={handlePlayerPassed}></PlayerList>
                </div>
                <div>
                    <PlayerList passedPlayers={players} selectId='playerTwo' labelText="Player Two" playerNumber={2} defaultPlayer={playerTwo} passCurrentPlayerToParent={handlePlayerPassed}></PlayerList>
                </div>
                <div>
                    <label htmlFor='numberOfSets'>Sets Played</label>
                    <input type='number' min="1" max="5" required id='numberOfSets' value={numberOfSets} onChange={onSetNumberOfSetsHandler} />
                </div>

                {displaySetInputs &&
                    Array.from({length: numberOfSets}).map((set, index) => (
                        <SetInput key={index + 1} playerOne={playerOne} playerTwo={playerTwo} setNumber={index + 1}/>
                    ))
                }
                <div>
                    <label htmlFor='date'>Date</label>
                    <input type='date' required id='date' value={date} onChange={onSetDateHandler} />
                </div>
                <div>
                    <label htmlFor='city'>City</label>
                    <input type='text' required id='city' value={city} onChange={onSetCityHandler} />
                </div>
                <div>
                    <label htmlFor='city'>Location</label>
                    <input type='text' required id='location' value={location} onChange={onSetLocationHandler} />
                </div>
                <div>
                    {image ? (
                        <img src={image} />
                    ) : (
                        <div>
                            <label htmlFor='image'>Upload Match Image</label>
                            <input id='image' type='file' required onChange={imageUpload => convertImageToBase64Handler(imageUpload)} />
                        </div>
                    )}
                </div>
                <div>
                    <button type="submit">{matchToBeUpdated ? `Update Match` : 'Add Match'}</button>
                </div>
            </form>
        </MatchesFormStyling>
    );
}

export default MatchesForm;