import { MatchFormComponentProps } from '@/interfaces/props/component-props/match-form-component-props.interface';
import { useState } from 'react';

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
    const onSetPlayerOneHandler = (event) => {
        setPlayerOne(event.target.value);
    }
    const onSetPlayerTwoHandler = (event) => {
        setPlayerTwo(event.target.value);
    }
    const onSetWinnerHandler = (event) => {
        setWinner(event.target.value);
    }
    const onSetDateHandler = (event) => {
        setDate(event.target.value);
    }
    const onSetScoreHandler = (event) => {
        setScore(event.target.value);
    }
    const onSetCityHandler = (event) => {
        setCity(event.target.value);
    }
    const onSetLocationHandler = (event) => {
        setLocation(event.target.value);
    }
    const onSetImageHandler = (event) => {
        setImage(event.target.value);
    }

    function submitMatchHandler(event) {
        event.preventDefault();
        const matchData = {};
       onMatchFormComplete(matchData);
    }

    return (
        <MatchesFormStyling>
            <form
                onSubmit={submitMatchHandler}>
            </form>
        </MatchesFormStyling>
    );
}

export default MatchesForm;