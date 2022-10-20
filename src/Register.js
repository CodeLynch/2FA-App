import React, { useState } from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Axios from 'axios';


const Register = () =>{
        const [firstnameReg, setFirstnameReg] = useState('')
        const [lastnameReg, setLastnameReg] = useState('')
        const [emailReg, setEmailReg] = useState('')
        const [usernameReg, setUsernameReg] = useState('')
        const [passwordReg, setPasswordReg] = useState('')

        const register = () =>{
                Axios.post('http://localhost:5000/register', {
                   firstname: firstnameReg,
                   lastname: lastnameReg,
                   email: emailReg,
                   username: usernameReg,
                   password: passwordReg,
                }).then((response) =>{
                   console.log(response);
                }).catch(e => {
                        console.log(e);
                });
        };

        const handleSubmit = event => {
                event.preventDefault();
                console.log('registration successful');
                
                
              };

    return (
        <div className="w-100">
            <div className="container" align="center">
            <div className="col-lg-8 px-5 py-5 row justify-content-center text-start" >
                    <h1 className="f1">Registration</h1>
                            <Form onSubmit={handleSubmit}>
                                <Form.Group className="mb-1" controlId="formFirstName" onChange={(e)=>{setFirstnameReg(e.target.value)}}>
                                        <Form.Control type="text" placeholder="First Name" />
                                </Form.Group>
                                <Form.Group className="mb-1" controlId="formLastName" onChange={(e)=>{setLastnameReg(e.target.value)}}>
                                        <Form.Control type="text" placeholder="Last Name" />
                                </Form.Group>
                                <Form.Group className="mb-1" controlId="formEmail" onChange={(e)=>{setEmailReg(e.target.value)}}>
                                        <Form.Control type="email" placeholder="Email" />
                                </Form.Group>
                                <Form.Group className="mb-1" controlId="formUsername" onChange={(e)=>{setUsernameReg(e.target.value)}}>
                                        <Form.Control type="text" placeholder="Username" />
                                </Form.Group>
                                <Form.Group className="mb-1" controlId="formPassword" onChange={(e)=>{setPasswordReg(e.target.value)}}>
                                        <Form.Control type="password" placeholder="Password" />
                                </Form.Group>
                                    <div className="d-flex justify-content-end">
                                        <Button align="right" variant="primary" type="submit" onClick={register}>
                                            Register
                                        </Button>
                                    </div>
                            </Form>
                    </div>
            </div>
        </div>
    )
}

export default Register