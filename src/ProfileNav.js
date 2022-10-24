import React, { useState } from "react";
import Nav from 'react-bootstrap/Nav';
//import { useNavigate } from 'react-router-dom';
//import Axios from 'axios';

const ProfileNav = () =>{
 
    // const login = () =>{
    //     if(usernameLog !== "" && passwordLog !== ""){
    //         Axios.post('http://localhost:5000/login', {
    //         username: usernameLog,
    //         password: passwordLog,
    //         }).then((response) =>{
    //         console.log(response);
    //         if(response.data.message){
    //             setInvalidLogIn(true)
    //         }
    //         }).catch(e => {
    //                 console.log(e);
    //         });
    //     }
    // };

    return (
        <div className="w-100 h-100 shadow-sm">
            <div className="container">
                <Nav className="d-flex flex-row-reverse py-2"
                    activeKey="/home"
                    onSelect={(selectedKey) => alert(`selected ${selectedKey}`)}
                >
                    <Nav.Item>
                        <Nav.Link eventKey="logout">Logout</Nav.Link>
                    </Nav.Item>
                </Nav>
            </div>
        </div>
    )
}

export default ProfileNav