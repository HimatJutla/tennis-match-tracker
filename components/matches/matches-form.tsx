import { Player } from '@/interfaces/player/player.interface';
import { MatchFormComponentProps } from '@/interfaces/props/component-props/match-form-component-props.interface';
import { useState } from 'react';
import PlayerList from '../players/playerList';

const MatchesFormStyling = styled.div`
`;

function MatchesForm({players, matchToBeUpdated, onMatchFormComplete}: MatchFormComponentProps) {

    const [isEditMode, setIsEditMode] = useState(matchToBeUpdated ? true: false);
    const [playerOne, setPlayerOne] = useState(matchToBeUpdated ? matchToBeUpdated.playerOne : '');
    const [playerTwo, setPlayerTwo] = useState(matchToBeUpdated ? matchToBeUpdated.playerTwo : '');
    const [winner, setWinner] = useState(matchToBeUpdated ? matchToBeUpdated.winner : '');
    const [date, setDate] = useState(matchToBeUpdated ? matchToBeUpdated.date : '');
    const [score, setScore] = useState(matchToBeUpdated ? matchToBeUpdated.score : '');
    const [city, setCity] = useState(matchToBeUpdated ? matchToBeUpdated.city : '');
    const [location, setLocation] = useState(matchToBeUpdated ? matchToBeUpdated.location : '');
    const [image, setImage] = useState(matchToBeUpdated ? matchToBeUpdated.image : '');

    // Setter Handlers
    const onSetPlayerOneHandler = (event: any): void => {
        setPlayerOne(event.target.value);
    }
    const onSetPlayerTwoHandler = (event: any): void => {
        setPlayerTwo(event.target.value);
    }
    const onSetWinnerHandler = (event: any): void => {
        setWinner(event.target.value);
    }
    const onSetDateHandler = (event: any): void => {
        setDate(event.target.value);
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
    const onSetImageHandler = (event: any): void => {
        setImage(event.target.value);
    }

    const handlePlayerPassed = (playerToBeUpdated: Player) => {
        console.log(playerToBeUpdated);
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

    return (
        <MatchesFormStyling>
            <form
                onSubmit={submitMatchHandler}>
                <div>
                    <label htmlFor='playerOne'>Player One</label>
                    <PlayerList passedPlayers={players} selectId='playerOne' labelText="Player One" passCurrentPlayerToParent={handlePlayerPassed}></PlayerList>
                </div>
                <div>
                    <label htmlFor='playerTwo'>Player Two</label>
                    <PlayerList passedPlayers={players} selectId='playerTwo' labelText="Player Two" passCurrentPlayerToParent={handlePlayerPassed}></PlayerList>
                </div>
                {/* do score here - maybe calc winner based on score */}
                {/* <div>
                    <label htmlFor='winner'>Winner</label>
                    <PlayerList passedPlayers={players} selectId='winner' labelText="Winner"></PlayerList>
                </div> */}
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
                <div className={NewPlayer.actions}>

                    <button>{props.playerToUpdate ? `Update ${props.playerToUpdate.fullName}` : 'Add New Player'}</button>
                </div>
            </form>
        </MatchesFormStyling>
    );
}

export default MatchesForm;