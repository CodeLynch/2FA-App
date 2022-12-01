import React, { useState, useEffect } from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import { useLocation, useNavigate } from 'react-router-dom';
import Axios from 'axios';


const ResetPass = (props) =>{
        const location = useLocation()
        const nav = useNavigate() 
        const [password, setPassword] = useState('')
        const [repassword, setRepassword] = useState('')
        const [invalidPass, setInvalid] = useState('')
        let alertTag ='';
        
        //if no state is passed that means the user did not redirect from otp page and is not verified yet
        useEffect(()=>{
                if(location.state === null){
                    nav('/');
                }
            }, [nav, location.state])

        const updatePassword = () =>{
                if(password !== "" && repassword !== ""){
                        if(password.length < 20 && repassword.length < 20){
                                if(password === repassword){
                                        Axios.post('http://localhost:5000/changePass', {
                                        email: location.state.email,
                                        newPass: password,
                                        }).then((response) =>{
                                                if(response.data.isSuccess === true){
                                                        alert("Password successfully changed!");
                                                        nav('/', {state: {reload:true}});
                                                }
                                        }).catch(e => {
                                                console.log(e);
                                        });
                                }else{
                                        setInvalid("Passwords do not match!");
                                }        
                        }else{
                                setInvalid('Maximum character input reached!')
                        }
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
        
        if(invalidPass !== ''){
                alertTag= <Alert key="danger" variant="danger">{invalidPass}</Alert> 
        }
         
              return (
                        <div className="w-100">
                        <div className="container" align="center">
                        <div className="col-lg-8 px-5 py-5 row justify-content-center text-start" >
                                <h1 className="f1">Reset Password</h1>
                                <p> Enter your new password</p>
                                {alertTag}
                                        <Form noValidate validated={validated} onSubmit={handleSubmit}>
                                                <Form.Group className="mb-1" controlId="formNewPass" onChange={(e)=>{setPassword(e.target.value)}}>
                                                        <Form.Control required type="password" placeholder="New Password" />
                                                        <Form.Control.Feedback type="invalid">
                                                        Please enter a password.
                                                        </Form.Control.Feedback>
                                                </Form.Group>
                                                <Form.Group className="mb-1" controlId="formRePass" onChange={(e)=>{setRepassword(e.target.value)}}>
                                                        <Form.Control required type="password" placeholder="Re-type Password" />
                                                        <Form.Control.Feedback type="invalid">
                                                        Please re-type your new password
                                                        </Form.Control.Feedback>
                                                </Form.Group>
                                                <div className="d-flex justify-content-end">
                                                                <Button align="right" variant="primary" type="submit" onClick={updatePassword}>
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