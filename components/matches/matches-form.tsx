import { Player } from '@/interfaces/player/player.interface';
import { Set } from '@/interfaces/match/match-score.interface';
import { MatchFormComponentProps } from '@/interfaces/props/component-props/match-form-component-props.interface';
import { useEffect, useState } from 'react';
import PlayerList from '../players/playerList';
import styled from 'styled-components';
import SetInput from './sets/set-input';
import { MatchScore } from '@/interfaces/match/match-score.interface';

const MatchesFormStyling = styled.div`
`;

function MatchesForm({players, matchToBeUpdated, onMatchFormComplete}: MatchFormComponentProps) {

    const [isEditMode, setIsEditMode] = useState(matchToBeUpdated ? true: false);
    const [playerOne, setPlayerOne] = useState(matchToBeUpdated ? matchToBeUpdated.playerOne : players[0]);
    const [playerTwo, setPlayerTwo] = useState(matchToBeUpdated ? matchToBeUpdated.playerTwo : players[1]);
    const [displaySetInputs, setDisplaySetInputs] = useState(false);
    const [numberOfSets, setNumberOfSets] = useState(matchToBeUpdated ? matchToBeUpdated.score.numberOfSets : 1);
    const [date, setDate] = useState(matchToBeUpdated ? matchToBeUpdated.date : '');
    const [score, setScore] = useState(matchToBeUpdated ? matchToBeUpdated.score : {numberOfSets: 1, sets: []});
    const [city, setCity] = useState(matchToBeUpdated ? matchToBeUpdated.city : '');
    const [location, setLocation] = useState(matchToBeUpdated ? matchToBeUpdated.location : '');
    const [image, setImage] = useState(matchToBeUpdated ? matchToBeUpdated.image : '');

    // Setter Handlers
    const onSetDateHandler = (event: any): void => {
        setDate(event.target.value);
    }
    const onSetNumberOfSetsHandler = (event: any): void => {
        setNumberOfSets(event.target.value);
    }
    const onSetScoreHandler = (score: MatchScore): void => {
        setScore(score);
    }
    const onSetCityHandler = (event: any): void => {
        setCity(event.target.value);
    }
    const onSetLocationHandler = (event: any): void => {
        setLocation(event.target.value);
    }
    const handlePlayerPassed = async (playerToBeUpdated: Player, playerNumber: number) => {
        playerNumber == 1 ? setPlayerOne(playerToBeUpdated) : setPlayerTwo(playerToBeUpdated);
    }

    const setShouldSetsBeDisplayedHandler = () => {
        if (playerOne && playerTwo && numberOfSets > 0) {
            setDisplaySetInputs(true);
            return;
        }
        setDisplaySetInputs(false);
    }

    // NTS: Clean this logic up - way too long, can be condensed with maps and filters
    const handleScoreChange = (playerOneScore: number, playerTwoScore: number, setNumber: number) => {
        const formattedSet = {
            setNumber: setNumber,
            playerOneScore: playerOneScore,
            playerTwoScore: playerTwoScore,
        }
        if (!score?.sets.length) {
            onSetScoreHandler({numberOfSets: numberOfSets, sets: [formattedSet]});
            return;
        }
        let newSetScore = score?.sets;
        score?.sets.forEach((set: Set, index: number): any => {
            if (set.setNumber === formattedSet.setNumber) {
                newSetScore[index] = formattedSet;
                return;
            }
        });
        const setNumberExistsInCurrentScore = score?.sets.find((set: Set) => {
            return set.setNumber === formattedSet.setNumber;
        });
        if (!setNumberExistsInCurrentScore) {
            newSetScore.push(formattedSet);
        }
        onSetScoreHandler({numberOfSets: numberOfSets, sets: [...newSetScore]});
    }

    // Utils
    const convertImageToBase64Handler = (e: any) => {
        const file = e.target.files[0];
        const reader = new FileReader();

        reader.onloadend = () => {
            if (reader.result) {
                setImage(reader?.result.toString());
            }
        };
        reader.readAsDataURL(file)
    }

    const verifyIfPlayerOneWins = (set: Set): boolean => {
        return set.playerOneScore > set.playerTwoScore;
    }

    const determineWinner = (score: MatchScore): Player => {
        let playerOneSetWins = 0;
        let playerTwoSetWins = 0;
        score.sets.forEach((set: Set) => {
            const playerOneWins = verifyIfPlayerOneWins(set);
            playerOneWins ? playerOneSetWins++ : playerTwoSetWins++;
        });
        if (playerOneSetWins > playerTwoSetWins) {
            return playerOne;
        }
        return playerTwo;
    }

    // Effects
    useEffect(() => {
        setShouldSetsBeDisplayedHandler();
    }, [playerOne, playerTwo, numberOfSets]);

    // Submit
    const submitMatchHandler = (event: any): void => {
        event.preventDefault();
        const matchData = {
            playerOne: playerOne,
            playerTwo: playerTwo,
            score: score,
            winner: determineWinner(score),
            date: date,
            city: city,
            location: location,
            image: image
        };
       onMatchFormComplete(matchData);
    }

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
                        <SetInput key={index + 1} playerOne={playerOne} playerTwo={playerTwo} setNumber={index + 1} passScoreUpToParent={handleScoreChange}/>
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
                        <img width="300" src={image} />
                    ) : (
                        <div>
                            <label htmlFor='image'>Upload Match Image</label>
                            <input id='image' type='file' onChange={e => convertImageToBase64Handler(e)} />
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