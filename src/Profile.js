import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import Axios from 'axios';

const Profile = (props) =>{
 
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
        <div className="w-100">
            <div className="container" align="left">
                    <div className="col-lg-8 px-5 py-5 row justify-content-left flex-start text-start">
                        <h1 className="f1">Welcome, Firstname Lastname!</h1>
                        <p>You have successfully logged in to your account.</p>
                    </div>
            </div>
        </div>
    )
}

export default Profile