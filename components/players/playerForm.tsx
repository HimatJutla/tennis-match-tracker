import { useState } from 'react';
import { PlayerFormComponentProps } from '@/interfaces/props/component-props/player-form-component-props.interface';
import { COUNTRY_DATA } from '@/consts/country-data';
import { Country } from '@/interfaces/player/country/country';
import styled from 'styled-components';

const PlayersFormStyling = styled.div`
    padding: 3%;
    background-color: #FFF9E9;
    border-radius: 8%;
    width: 50%;
`;

function PlayerForm({player, onPlayerFormComplete}: PlayerFormComponentProps) {

    const [firstName, setFirstName] = useState(player ? player?.firstName : '');
    const [lastName, setLastName] = useState(player ? player?.lastName : '');
    const [bio, setBio] = useState(player ? player?.bio : '');
    const [dateOfBirth, setDateOfBirth] = useState(player ? player?.dateOfBirth : '');
    const [country, setCountry] = useState(player ? player?.country : null);
    const [city, setCity] = useState(player ? player?.city : '');
    const [email, setEmail] = useState(player ? player?.email : '');
    const [image, setImage] = useState(player ? player?.image : '');

    // Setter Handlers
    const onSetFirstNameHandler = (event: any): void => {
        setFirstName(event.target.value);
    }
    const onSetLastNameHandler = (event: any): void => {
        setLastName(event.target.value);
    }
    const onSetBioHandler = (event: any): void => {
        setBio(event.target.value);
    }
    const onSetDateOfBirthHandler = (event: any): void => {
        setDateOfBirth(event.target.value);
    }
    const onSetCountryHandler = (event: any): void => {
        setCountry(JSON.parse(event.target.value));
    }
    const onSetCityHandler = (event: any): void => {
        setCity(event.target.value);
    }
    const onSetEmailHandler = (event: any): void => {
        setEmail(event.target.value);
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

    // Submit
    const submitPlayerHandler = (event: any): void => {
        event.preventDefault();
        const playerData = {
            firstName: firstName,
            lastName: lastName,
            bio: bio,
            dateOfBirth: dateOfBirth,
            country: country,
            wins: 0,
            losses: 0,
            winningPercentage: 0,
            totalMatches: 0,
            city: city,
            email: email,
            image: image
        };
       onPlayerFormComplete(playerData);
    }

    return (
        <PlayersFormStyling>
            <form
                onSubmit={submitPlayerHandler}>
                <div
                    className="mb-3">
                    <div>
                        <label htmlFor='firstName'>First Name</label>
                    </div>
                    <input className="w-100" type='text' required id='firstName' value={firstName} onChange={onSetFirstNameHandler} />
                </div>
                <div
                    className="mb-3">
                    <div>
                        <label htmlFor='lastName'>Last Name</label>
                    </div>
                    <input className="w-100" type='text' required id='lastName' value={lastName} onChange={onSetLastNameHandler} />
                </div>
                <div
                    className="mb-3">
                    <div>
                        <label htmlFor='dateOfBirth'>Date Of Birth</label>
                    </div>
                    <input className="w-100" type='date' required id='dateOfBirth' value={dateOfBirth} onChange={onSetDateOfBirthHandler} />
                </div>
                <div
                    className="mb-3">
                    <div>
                        <label htmlFor='bio'>Bio</label>
                    </div>
                    <input className="w-100" type='text' max="100" required id='bio' value={bio} onChange={onSetBioHandler} />
                </div>
                <div
                    className="mb-3">
                    <div>
                        <label htmlFor='country'>Country</label>
                    </div>
                    <select className="w-100" required onChange={onSetCountryHandler} id='country'>
                    {COUNTRY_DATA.map((country: Country) => (
                        <option
                            key={country.isoCode}
                            id={country.isoCode}
                            value={JSON.stringify(country)}>
                            {country?.flag} {country?.name}
                        </option>
                    ))}
                </select>
                </div>
                <div
                    className="mb-3">
                    <div>
                        <label htmlFor='city'>City</label>
                    </div>
                    <input className="w-100" type='text' required id='city' value={city} onChange={onSetCityHandler} />
                </div>
                <div
                    className="mb-3">
                    <div>
                        <label htmlFor='email'>Email</label>
                    </div>
                    <input className="w-100" type='text' required min="5" id='email' value={email} onChange={onSetEmailHandler} />
                </div>
                <div
                    className="mb-4">
                    {image ? (
                        <div
                            className="flex items-center justify-center">
                            <img width="300" src={image} />
                        </div>
                    ) : (
                        <div
                            className="mb-3">
                            <div>
                                <label htmlFor='image'>Upload An Image of the Player's Beautiful Face</label>
                            </div>
                            <input className="w-100" id='image' type='file' onChange={e => convertImageToBase64Handler(e)} />
                        </div>
                    )}
                </div>
                <div
                    className="flex items-center justify-end">
                    <button  className="py-1 px-3" type="submit">{player ? `Update Player` : 'Create Player'}</button>
                </div>
            </form>
        </PlayersFormStyling>
    );
}

export default PlayerForm;