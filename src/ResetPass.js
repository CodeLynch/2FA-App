import React, { useState } from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
//import { Navigate } from 'react-router-dom';
//import Axios from 'axios';


const ResetPass = () =>{
        const [password, setPassword] = useState('')
        const [repassword, setRepassword] = useState('')
        
        // const register = () =>{
        //         console.log(firstnameReg !== "" && lastnameReg !== "" && emailReg !== "" && usernameReg !== "" && passwordReg !== "" )
        //         if(firstnameReg !== "" && lastnameReg !== "" && emailReg !== "" 
        //         && usernameReg !== "" && passwordReg !== "" ){
        //                 Axios.post('http://localhost:5000/register', {
        //                 firstname: firstnameReg,
        //                 lastname: lastnameReg,
        //                 email: emailReg,
        //                 username: usernameReg,
        //                 password: passwordReg,
        //                 }).then((response) =>{
        //                         console.log("response? ",response.status);
        //                         if(response.status === 200){
        //                                 setIsRegistered(true);
        //                                 console.log("is registered? ",isRegistered);
        //                         }
        //                 }).catch(e => {
        //                         console.log(e);
        //                 });
        //         }
        // };

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
         
              return (
                        <div className="w-100">
                        <div className="container" align="center">
                        <div className="col-lg-8 px-5 py-5 row justify-content-center text-start" >
                                <h1 className="f1">Reset Password</h1>
                                <p> Enter your new password</p>
                                        <Form noValidate validated={validated} onSubmit={handleSubmit}>
                                                <Form.Group className="mb-1" controlId="formNewPass" onChange={(e)=>{setPassword(e.target.value)}}>
                                                        <Form.Control required type="text" placeholder="New Password" />
                                                        <Form.Control.Feedback type="invalid">
                                                        Please enter a password.
                                                        </Form.Control.Feedback>
                                                </Form.Group>
                                                <Form.Group className="mb-1" controlId="formRePass" onChange={(e)=>{setRepassword(e.target.value)}}>
                                                        <Form.Control required type="text" placeholder="Re-type Password" />
                                                        <Form.Control.Feedback type="invalid">
                                                        Please re-type your new password
                                                        </Form.Control.Feedback>
                                                </Form.Group>
                                                <div className="d-flex justify-content-end">
                                                                <Button align="right" variant="primary" type="submit" /*onClick={register}*/>
                                                                        Confirm
                                                                </Button>
                                                </div>
                                        </Form>
                                </div>
                        </div>
                        </div>
                )
}

export default ResetPass