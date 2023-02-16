import { useState } from 'react';
import { FindMatchFormComponentProps } from '@/interfaces/props/component-props/find-match-form-component-props.interface';

function FindMatchForm({onFindMatchFormComplete}: FindMatchFormComponentProps) {

    const [city, setCity] = useState('');

    // Setter Handlers
    const onSetCityHandler = (event: any): void => {
        setCity(event.target.value);
    }

    // Submit
    const submitFindMatchHandler = (event: any): void => {
        event.preventDefault();
        const userInputtedCity = city;
        setCity('');
        onFindMatchFormComplete(userInputtedCity);
    }

    return (
        <>
            <form
                onSubmit={submitFindMatchHandler}>
                <div>
                    <label htmlFor='city'>City</label>
                    <input type='text' required id='city' value={city} onChange={onSetCityHandler} />
                </div>
                <div>
                    <button
                        type="submit">
                        Find Players
                    </button>
                </div>
            </form>
        </>
    );
}

export default FindMatchForm;