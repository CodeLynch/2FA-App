import './Buttons.css';
import React, { useState } from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Navigate, Link } from 'react-router-dom';
import Axios from 'axios';


const Register = () =>{
        
        const [firstnameReg, setFirstnameReg] = useState('')
        const [lastnameReg, setLastnameReg] = useState('')
        const [emailReg, setEmailReg] = useState('')
        const [usernameReg, setUsernameReg] = useState('')
        const [passwordReg, setPasswordReg] = useState('')
        const [isRegistered, setIsRegistered] = useState(false)
        let isValid = false;
        const [validated, setValidated] = useState(false);       

        Axios.defaults.withCredentials = true;
        const register = () =>{
                Axios.post('http://localhost:5000/register', {
                firstname: firstnameReg,
                lastname: lastnameReg,
                email: emailReg,
                username: usernameReg,
                password: passwordReg,
                }).then((response) =>{
                        if(response.data.message){
                                alert(response.data.message)
                        }else{
                                alert("Successfully Registered!")
                                setIsRegistered(true);
                        }
                                
                }).catch(e => {
                        console.log(e);
                });
        };

        

        const handleSubmit = event => {
                event.preventDefault(); 
                const form = event.currentTarget;
                if (form.checkValidity() === false) {
                    event.preventDefault();
                    event.stopPropagation();
                    isValid = false;
                  }else{
                    isValid = true;
                  }
                setValidated(true);
                if(isValid){
                   register();
                }      
              };

              if(isRegistered){
                return <Navigate to={"/"} state={{ justRegistered:"true" }} />
              }          
              return (
                <div className='d-flex flex-column w-100 h-100 main-background'>
                        <div className='m-3 p-1'>
                        <img src="2falogo.png" height={85} width={130} alt="logo"/>
                        </div>
                        <div className="w-100">
                        <div className="container bg-white shadow w-50 rounded" align="center">
                        <div className="col-lg-15 p-5 row justify-content-center text-start" >
                                <h1 className="f1 styledText">Registration</h1>
                                        <Form noValidate validated={validated} onSubmit={handleSubmit}>
                                                <Form.Group className="mb-1" controlId="formFirstName" onChange={(e)=>{setFirstnameReg(e.target.value); setValidated(false)}}>
                                                        <Form.Control required type="text" placeholder="First Name" maxLength={20} />
                                                        <Form.Control.Feedback type="invalid">
                                                        Please enter your first name.
                                                        </Form.Control.Feedback>
                                                </Form.Group>
                                                <Form.Group className="mb-1" controlId="formLastName" onChange={(e)=>{setLastnameReg(e.target.value); setValidated(false)}}>
                                                        <Form.Control required type="text" placeholder="Last Name" maxLength={20} />
                                                        <Form.Control.Feedback type="invalid">
                                                        Please enter your last name.
                                                        </Form.Control.Feedback>
                                                </Form.Group>
                                                <Form.Group className="mb-1" controlId="formEmail" onChange={(e)=>{setEmailReg(e.target.value); setValidated(false)}}>
                                                        <Form.Control required type="email" placeholder="Email" />
                                                        <Form.Control.Feedback type="invalid">
                                                        Please enter your email.
                                                        </Form.Control.Feedback>
                                                </Form.Group>
                                                <Form.Group className="mb-1" controlId="formUsername" onChange={(e)=>{setUsernameReg(e.target.value); setValidated(false)}}>
                                                        <Form.Control required type="text" placeholder="Username" maxLength={20}/>
                                                        <Form.Control.Feedback type="invalid">
                                                        Please enter a username.
                                                        </Form.Control.Feedback>
                                                </Form.Group>
                                                <Form.Group className="mb-1" controlId="formPassword" onChange={(e)=>{setPasswordReg(e.target.value); setValidated(false)}}>
                                                        <Form.Control required type="password" placeholder="Password" maxLength={20} />
                                                        <Form.Control.Feedback type="invalid">
                                                        Please enter a password.
                                                        </Form.Control.Feedback>
                                                </Form.Group>
                                                <div className="d-flex justify-content-between">
                                                                <Link to="/">Back to Login Page</Link>
                                                                <Button className="btn-plum" align="right" type="submit">
                                                                        Register
                                                                </Button>
                                                </div>
                                        </Form>
                                </div>
                        </div>
                        </div>
                        <footer className="d-flex justify-content-center align-items-end flex-row" style={{color:"grey", fontSize:".7rem"}}> 
                        <div className="d-flex justify-content-center">
                                This project was created to fulfill a requirement for CSIT335.
                        </div> 
                        <img className='m-1' src="2falogoALT.png" height={35} width={50} alt="grey logo"/>
                </footer>   
                </div>       
                )
}

export default Register