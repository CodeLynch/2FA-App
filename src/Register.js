import './Buttons.css';
import React, { useState } from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { InputGroup } from 'react-bootstrap';
import { Navigate, Link } from 'react-router-dom';
import Axios from 'axios';
import { Alert } from 'react-bootstrap';
import { useEffect } from 'react';
import { AiFillEyeInvisible, AiFillEye} from 'react-icons/ai'


const Register = () =>{
        
        const [firstnameReg, setFirstnameReg] = useState('')
        const [lastnameReg, setLastnameReg] = useState('')
        const [emailReg, setEmailReg] = useState('')
        const [usernameReg, setUsernameReg] = useState('')
        const [passwordReg, setPasswordReg] = useState('')
        const [isRegistered, setIsRegistered] = useState(false)
        const [mustConfirm, setConfirm] = useState(false)
        const [isPassStrong, setStrong] = useState(false)
        const [Continue, setCont] = useState(false);
        const [PassReq, setPassReq] = useState(<></>)
        const [PassStr, setPassStr] = useState(<></>)
        let isValid = false;
        const [validated, setValidated] = useState(false);  
        const [showModal, setShow] = useState(false); 
        const [showPass, setShowPass] = useState(false);    

        Axios.defaults.withCredentials = true;

        const countReq = (caps, low, num, sym, len) => {
                let count = 0
                if(caps){
                        count += 1;
                }
                if(low){
                        count += 1;
                }
                if(num){
                        count += 1;
                }
                if(sym){
                        count += 1;
                }
                if(len){
                        count += 1
                }

                return count;
        }
        const checkPassword = () => {
                let caps = (passwordReg.match(/[A-Z]/g) || []).length > 0;
                let low = (passwordReg.match(/[a-z]/g) || []).length > 0;
                let num = (passwordReg.match(/[0-9]/g) || []).length > 0;
                let sym = (passwordReg.match(/\W/g) || []).length > 0;
                let len = passwordReg.length > 11;
                if ((!caps || 
                    !low || 
                    !num || 
                    !sym || 
                    !len) && 
                    passwordReg.length > 0){
                        setConfirm(true)
                        setStrong(false)
                        setPassReq(<Alert key="info" variant="info">
                        <p>Strong passwords have the following requirements:</p>
                        <ul>
                            {caps?<></>:<li>MUST contain at least one uppercase letter.</li>}
                            {low?<></>:<li>MUST contain at least one lowercase letter.</li>}
                            {num?<></>:<li>MUST contain at least one number.</li>}
                            {sym?<></>:<li>MUST contain at least one special character.</li>}
                            {len?<></>:<li>MUST have at least 12 characters.</li>}
                        </ul>
                        </Alert>)

                        if(countReq(caps, low, num, sym, len) > 2){
                                setPassStr(<p>Password Strength: <b>Medium</b></p>)
                        }else{
                                setPassStr(<p>Password Strength: <b>Weak</b></p>)
                        }
                }else{
                    setPassReq(<></>);
                    setStrong(true);
                    passwordReg.length > 0? setPassStr(<p>Password Strength: <b>Strong</b></p>):setPassStr(<></>)
                    setConfirm(false);
                }
                
        }

        useEffect(()=>{
                checkPassword()
        },[passwordReg]);

        
        const register = () =>{
                if (mustConfirm) {
                        handleModalOpen();
                }
                else{
                        Axios.post('http://localhost:5000/register', {
                        firstname: firstnameReg,
                        lastname: lastnameReg,
                        email: emailReg,
                        username: usernameReg,
                        password: passwordReg,
                        strongPass: isPassStrong,
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
                }
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

        const handleModalOpen = () => {
                setShow(true);
        }

        const handleModalClose = () => {
                setShow(false);
        }

        useEffect(()=>{
                if(Continue){
                     register();   
                }
        },[Continue])

        if(isRegistered){
        return <Navigate to={"/"} state={{ justRegistered:"true" }} />
        }          
        return (
        <div className='d-flex flex-column w-100 h-100 main-background'>
                <Modal
                show={showModal}
                onHide={handleModalClose}
                backdrop="static"
                keyboard={false}
                >
                <Modal.Header closeButton>
                <Modal.Title>Confirm Registration</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <p>Are you sure you want to continue despite your password strength?</p>
                <p>(Accounts with a weak/medium password cannot turn off 2FA)</p>
                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={handleModalClose}>
                No
                </Button>
                <Button variant="primary" onClick={()=>{setConfirm(false); setCont(true);}}>Yes</Button>
                </Modal.Footer>
        </Modal>
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
                                        {PassReq}
                                        <InputGroup  className="mb-1" controlId="formPassword" onChange={(e)=>{setPasswordReg(e.target.value); checkPassword(); setValidated(false)}}>
                                                <Form.Control required type={showPass?"text":"password"} placeholder="Password" maxLength={20} />
                                                <Form.Control.Feedback type="invalid">
                                                Please enter a password.
                                                </Form.Control.Feedback>
                                                <Button id="button-addon2" variant="outline-primary" onClick={()=>{setShowPass(!showPass)}}>{showPass?<AiFillEyeInvisible/>:<AiFillEye/>}</Button>
                                        </InputGroup>
                                        {PassStr}
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
        </div>       
        )
}

export default Register