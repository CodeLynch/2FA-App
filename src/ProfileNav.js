//import React, { useState } from "react";
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import Axios from 'axios';

const ProfileNav = () =>{
    const logout = () =>{
            Axios.get("http://localhost:5000/logout").then((response)=>{
                window.location.reload();
            })        
    };


    
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


    

export default ProfileNav