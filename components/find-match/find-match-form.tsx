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
                <div className="w-30 mb-3">
                    <div
                        className="mb-1">
                        <label className="white-text" htmlFor='city'>CITY</label>
                    </div>
                    <input className="w-100" type='text' required id='city' value={city} onChange={onSetCityHandler} />
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

export default FindMatchForm;