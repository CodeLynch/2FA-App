import React, { useState } from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Navigate } from 'react-router-dom';
import Axios from 'axios';


const Register = () =>{
        const [firstnameReg, setFirstnameReg] = useState('')
        const [lastnameReg, setLastnameReg] = useState('')
        const [emailReg, setEmailReg] = useState('')
        const [usernameReg, setUsernameReg] = useState('')
        const [passwordReg, setPasswordReg] = useState('')
        const [isRegistered, setIsRegistered] = useState(false)



        const register = () =>{
                console.log(firstnameReg !== "" && lastnameReg !== "" && emailReg !== "" && usernameReg !== "" && passwordReg !== "" )
                if(firstnameReg !== "" && lastnameReg !== "" && emailReg !== "" 
                && usernameReg !== "" && passwordReg !== "" ){
                        Axios.post('http://localhost:5000/register', {
                        firstname: firstnameReg,
                        lastname: lastnameReg,
                        email: emailReg,
                        username: usernameReg,
                        password: passwordReg,
                        }).then((response) =>{
                                console.log("response? ",response.status);
                                if(response.status === 200){
                                        setIsRegistered(true);
                                        console.log("is registered? ",isRegistered);
                                }
                        }).catch(e => {
                                console.log(e);
                        });
                }
        };

        const [validated, setValidated] = useState(false);

        const handleSubmit = event => {
                event.preventDefault(); 
                const form = event.currentTarget;
                if (form.checkValidity() === false) {
                    event.preventDefault();
                    event.stopPropagation();
                  }
                setValidated(true);      
              };

              if(isRegistered){
                return <Navigate to={"/"} replace="true" state={{ justRegistered:"true" }} />
              }          
              return (
                        <div className="w-100">
                        <div className="container" align="center">
                        <div className="col-lg-8 px-5 py-5 row justify-content-center text-start" >
                                <h1 className="f1">Registration</h1>
                                        <Form noValidate validated={validated} onSubmit={handleSubmit}>
                                                <Form.Group className="mb-1" controlId="formFirstName" onChange={(e)=>{setFirstnameReg(e.target.value)}}>
                                                        <Form.Control required type="text" placeholder="First Name" />
                                                        <Form.Control.Feedback type="invalid">
                                                        Please enter your first name.
                                                        </Form.Control.Feedback>
                                                </Form.Group>
                                                <Form.Group className="mb-1" controlId="formLastName" onChange={(e)=>{setLastnameReg(e.target.value)}}>
                                                        <Form.Control required type="text" placeholder="Last Name" />
                                                        <Form.Control.Feedback type="invalid">
                                                        Please enter your last name.
                                                        </Form.Control.Feedback>
                                                </Form.Group>
                                                <Form.Group className="mb-1" controlId="formEmail" onChange={(e)=>{setEmailReg(e.target.value)}}>
                                                        <Form.Control required type="email" placeholder="Email" />
                                                        <Form.Control.Feedback type="invalid">
                                                        Please enter your email.
                                                        </Form.Control.Feedback>
                                                </Form.Group>
                                                <Form.Group className="mb-1" controlId="formUsername" onChange={(e)=>{setUsernameReg(e.target.value)}}>
                                                        <Form.Control required type="text" placeholder="Username" />
                                                        <Form.Control.Feedback type="invalid">
                                                        Please enter a username.
                                                        </Form.Control.Feedback>
                                                </Form.Group>
                                                <Form.Group className="mb-1" controlId="formPassword" onChange={(e)=>{setPasswordReg(e.target.value)}}>
                                                        <Form.Control required type="password" placeholder="Password" />
                                                        <Form.Control.Feedback type="invalid">
                                                        Please enter a password.
                                                        </Form.Control.Feedback>
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