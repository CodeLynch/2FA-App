//import React, { useState } from "react";
import Nav from 'react-bootstrap/Nav';
import { Navigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import { useState } from 'react';
//import Axios from 'axios';

const ProfileNav = () =>{
    const [loggedOut, setLoggedOut] = useState(false)
    const logout = () =>{
            setLoggedOut(true);
    };

    if(loggedOut){
        return <Navigate to={"/"}/>
    }else{
        return (
            <div className="w-100 h-100 shadow-sm">
                <div className="container">
                    <Nav className="d-flex flex-row-reverse py-2" bg="primary" variant="dark">
                        <Nav.Item>
                            <Button className="mx-0 p-0" variant="link text-decoration-none" type="submit" onClick={ logout }>
                                Logout
                            </Button>
                        </Nav.Item>
                    </Nav>
                </div>
            </div>
        )
    }
    }


    

export default ProfileNav