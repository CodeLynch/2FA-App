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
            <div className="w-100 h-100 shadow-sm nav-background shadow-sm">
                <div className="container">
                    <Nav className="d-flex justify-content-between py-2" bg="primary" variant="dark">
                    <img className='m-1' src="2falogo.png" height={55} width={70} alt="grey logo"/>
                        <Nav.Item className='d-flex align-items-end'>
                            <Button className="mx-0 p-0" variant="text-decoration-none" type="submit" onClick={ logout }>
                                <p className="m-0 navText">Logout</p>
                            </Button>
                        </Nav.Item>
                    </Nav>
                </div>
            </div>
        )
    }


    

export default ProfileNav