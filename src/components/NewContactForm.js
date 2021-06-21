import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { ReactComponent as TickIcon } from '../assets/images/tick-icon.svg';

const NewContactForm = () => {

    const [data, saveData] = useState([]);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [birthday, setBirthday] = useState();

    useEffect (() => {
        getData();
    },[]);

    const getData = () =>{
        axios.get('http://localhost:3000/people')
        .then((res) => saveData(res.data));
    }  

    const handlesave = (e) => {
        e.preventDefault();
        axios.post('http://localhost:3000/people', {
            firstName : firstName,
            lastName : lastName,
            email: email,
            birthday: birthday
        }).then(()=>{
            setFirstName("");
            setLastName("");
            setEmail("");
            setBirthday("");
            window.location.reload();
        })
    }

    return (
        <div className="form">
            <h3>Ajouter</h3>
            <form onSubmit={(e) => handlesave (e)}>
                <input type="text" onChange={(e) => setFirstName(e.target.value)} placeholder="Prénom" value={firstName} required></input>
                <input type="text" onChange={(e) => setLastName(e.target.value)} placeholder="Nom" value={lastName} required></input>
                <input type="email" onChange={(e) => setEmail(e.target.value)} placeholder="Email" value={email} required></input>
                <input className="birthday" type="text" placeholder="Birthday" onFocus={(e) => (e.target.type='date')} onChange={(e) => setBirthday(e.target.value)} value={birthday || ''} required></input>
                <div></div>
                <button id="save" className="save" type="submit" value="Save"><TickIcon /></button>
            </form>
        </div>
    )
};

export default NewContactForm;