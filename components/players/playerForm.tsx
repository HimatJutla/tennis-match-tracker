import { useState } from 'react';
import { PlayerFormComponentProps } from '@/interfaces/props/component-props/player-form-component-props.interface';

function PlayerForm({player, onPlayerFormComplete}: PlayerFormComponentProps) {

    const [firstName, setFirstName] = useState(player ? player?.firstName : '');
    const [lastName, setLastName] = useState(player ? player?.lastName : '');
    const [bio, setBio] = useState(player ? player?.bio : '');
    const [dateOfBirth, setDateOfBirth] = useState(player ? player?.dateOfBirth : '');
    const [country, setCountry] = useState(player ? player?.country : '');
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
        setCountry(event.target.value);
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
            city: city,
            email: email,
            image: image
        };
       onPlayerFormComplete(playerData);
    }

    return (
        <>
            <form
                onSubmit={submitPlayerHandler}>
                <div>
                    <label htmlFor='firstName'>First Name</label>
                    <input type='text' required id='firstName' value={firstName} onChange={onSetFirstNameHandler} />
                </div>
                <div>
                    <label htmlFor='lastName'>Last Name</label>
                    <input type='text' required id='lastName' value={lastName} onChange={onSetLastNameHandler} />
                </div>
                <div>
                    <label htmlFor='dateOfBirth'>Date Of Birth</label>
                    <input type='date' required id='dateOfBirth' value={dateOfBirth} onChange={onSetDateOfBirthHandler} />
                </div>
                <div>
                    <label htmlFor='bio'>Bio</label>
                    <input type='text' max="100" required id='bio' value={bio} onChange={onSetBioHandler} />
                </div>
                <div>
                    <label htmlFor='country'>Country</label>
                    <input type='text' required id='country' value={country} onChange={onSetCountryHandler} />
                </div>
                <div>
                    <label htmlFor='city'>City</label>
                    <input type='text' required id='city' value={city} onChange={onSetCityHandler} />
                </div>
                <div>
                    <label htmlFor='email'>Email</label>
                    <input type='text' required min="5" id='email' value={email} onChange={onSetEmailHandler} />
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
                    <button type="submit">{player ? `Update Player` : 'Create Player'}</button>
                </div>
            </form>
        </>
    );
}

export default PlayerForm;