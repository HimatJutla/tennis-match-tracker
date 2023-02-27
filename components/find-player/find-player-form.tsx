import { useState } from 'react';
import { FindMatchFormComponentProps } from '@/interfaces/props/component-props/find-match-form-component-props.interface';
import { FindPlayerFormComponentProps } from '@/interfaces/props/component-props/find-player-form-component-props.interface';

function FindPlayerForm({onFindPlayerFormComplete}: FindPlayerFormComponentProps) {

    const [playerName, setPlayerName] = useState('');

    // Setter Handlers
    const onSetPlayerNameHandler = (event: any): void => {
        setPlayerName(event.target.value);
    }

    // Submit
    const submitFindPlayerHandler = (event: any): void => {
        event.preventDefault();
        const userInputtedCity = playerName;
        setPlayerName('');
        onFindPlayerFormComplete(userInputtedCity);
    }

    return (
        <>
            <form
                onSubmit={submitFindPlayerHandler}>
                <div className="w-30 mb-3">
                    <div
                        className="mb-1">
                        <label className="white-text" htmlFor='city'>PLAYER NAME</label>
                    </div>
                    <input className="w-100" type='text' required id='city' value={playerName} onChange={onSetPlayerNameHandler} />
                </div>
                <div className="w-30 flex justify-end">
                    <button
                        className="py-1 px-2"
                        type="submit">
                        Find Players
                    </button>
                </div>
            </form>
        </>
    );
}

export default FindPlayerForm;