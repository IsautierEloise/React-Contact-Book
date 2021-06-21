import React, { useEffect, useState } from "react";
import axios from 'axios';
import { ReactComponent as EditIcon } from '../assets/images/edit-icon.svg';
import { ReactComponent as DeleteIcon } from '../assets/images/delete-icon.svg';
import { ReactComponent as TickIcon } from '../assets/images/tick-icon-violet.svg';


const ContactCard = (props) => {
    const {contact} = props;
    const [isEditing, setIsEditing] = useState(false);
    const [editFirstName, setEditFirstName] = useState('');
    const [editLastName, setEditLastName] = useState('');
    const [editBirthday, setEditDate] = useState('');
    const [editEmail, setEditEmail] = useState('');

    const edit = (e) => {
        const data = {
            lastName : editLastName,
            firstName : editFirstName,
            email : editEmail,
            birthday : editBirthday
        }

        axios.put("http://localhost:3000/people/" + contact.id, data).then(()=> {
            setIsEditing(false);
        })
    }
    
    const deleteContact = (id) => {
        axios.delete('http://localhost:3000/people/' + id)
        window.location.reload();
    }

    return (
        <div className="ContactCard">
        <h3>
            {isEditing ? (
                <input type="text" className="ContactCard-name-input" onChange={(e) => setEditFirstName(e.target.value)} autoFocus defaultValue={editFirstName ? editFirstName : contact.lastName}></input>
            ) : (<span className="ContactCard-name" >{editFirstName ? editFirstName : contact.lastName} </span>)}
            
                {isEditing ? (
                <input type="text" onChange={(e) => setEditLastName(e.target.value)} defaultValue={editLastName ? editLastName : contact.firstName}></input>
            ) : (<span className="ContactCard-name">{editLastName ? editLastName : contact.firstName}</span>)}
        </h3>
        {isEditing ? (
            <input type="date" onChange={(e) => setEditDate(e.target.value)} defaultValue={editBirthday ? editBirthday : contact.birthday}></input>
        ) : (<span>{editBirthday ? editBirthday : contact.birthday}</span>)}
        {isEditing ? (
            <input  type="email" onChange={(e) => setEditEmail(e.target.value)} defaultValue={editEmail ? editEmail : contact.email}></input>
        ) : (<span>{editEmail ? editEmail : contact.email}</span>)}
        <div className="ContactCard-buttons">
            {isEditing ? (
                <button className="ContactCard-button" onClick={edit}><TickIcon /></button>
            ): (
                <button className="ContactCard-button" onClick={() => setIsEditing(true)}><EditIcon /></button>
            )}
            <button className="ContactCard-button" onClick={() =>{ deleteContact(contact.id); }}><DeleteIcon /></button>
        </div>
    </div>);
}
export default ContactCard

