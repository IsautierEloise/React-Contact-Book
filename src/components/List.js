import axios from "axios";
import React, { useEffect, useState } from "react";
import Slider from "./Slider"
import Card from "./ContactCard";
import { ReactComponent as SearchIcon } from '../assets/images/search-icon.svg';

const List = () => {
    const[data, setData]= useState([]);
    const[searchInput, setSearchInput] = useState("")

    const search = (e) =>{
        let value = e.target.value;
        setSearchInput(value);
    }

    useEffect(() => {
        axios
        .get("http://localhost:3000/people")
        .then((res) => setData(res.data));
        
    },[]);
    
    return (
        <div className="List">
            <div className="Header">
                <h1>Contacts</h1>
                <Slider></Slider>
            </div>
            <div className="List-search">  
                <input type="search" className="List-search-input" placeholder="Search..." onChange={search}/>
                <SearchIcon />      
            </div>
            <ul>
                {data.filter((val) => {
                    return val.firstName.toLowerCase().includes(searchInput.toLowerCase()) || val.lastName.toLowerCase().includes(searchInput.toLowerCase()) ||  val.email.toLowerCase().includes(searchInput.toLowerCase());
                }).map((contact)=> {
                    if (searchInput){
                        return (
                        <Card contact={contact}/>
                        ) 
                    }
                    return (
                        <Card contact={contact}/>
                    )        
                }          
                )}
            </ul>
        </div>
    )
}

export default List;