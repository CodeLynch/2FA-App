import React, { useState } from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import { useNavigate, Link } from 'react-router-dom';
import Axios from 'axios';

const Login = () =>{
    const [usernameLog, setUsernameLog] = useState('')
    const [passwordLog, setPasswordLog] = useState('')
    const [invalidLogIn, setInvalidLogIn] = useState('')
    const [validLogIn, setValidLogIn] = useState(false)
    const [loginError, setLoginError] = useState('')
    const [validated, setValidated] = useState(false)
    const [isLoading, setLoading] = useState(false)
    const nav = useNavigate();

    Axios.defaults.withCredentials = true;
    const login = () =>{
        if(usernameLog !== "" && passwordLog !== ""){
            Axios.post('http://localhost:5000/users', {
            username: usernameLog,
            password: passwordLog,
            }).then((response) =>{
            if(response.data.message){
                setLoginError(response.data.message)
                setInvalidLogIn(true)
            }else{
                if(response.data[0].use2FA === 1){
                    setLoading(true);
                    Axios.get("http://localhost:5000/otp").then((response)=>{
                        if(response.data.message){
                            nav('/otp', {state: {forgotPass:false} })
                        }                       
                    })
                }else{
                    setValidLogIn(true);
                }
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
                  }
                setValidated(true);  
            };

    let alertTag ="";
    if(invalidLogIn){
        alertTag = <Alert key="danger" variant="danger">{loginError}</Alert>        
    }
    if(validLogIn){
        window.location.reload();
    }
    if(isLoading){
        return <h1>LOADING...</h1>
    }else{
        return (
            <div className="w-100">
                <div className="container" align="center">
                <div className="col-lg-8 px-5 py-5 row justify-content-center text-start">
                        <h1 className="f1">Log-In</h1>
                                {alertTag}
                                <Form noValidate validated={validated} onSubmit={ handleSubmit }>
                                    <Form.Group className="mb-3" controlId="formUsername" onChange={(e)=>{setUsernameLog(e.target.value);}}>
                                            <Form.Control required type="text" placeholder="Username" />
                                            <Form.Control.Feedback type="invalid">
                                                Please enter a username.
                                            </Form.Control.Feedback>
                                    </Form.Group>

                                    <Form.Group className="mb-3" controlId="formPassword" onChange={(e)=>{setPasswordLog(e.target.value);}}>
                                            <Form.Control required type="password" placeholder="Password" />
                                            <Form.Control.Feedback type="invalid">
                                                Please enter your password.
                                            </Form.Control.Feedback>
                                    </Form.Group>
                                        <div className="d-flex justify-content-between">
                                            <div>
                                            <Form.Text className="text-muted">
                                                Don't have an account? Register&nbsp;
                                            </Form.Text>
                                            <Link to="/register">here</Link>
                                            </div>
                                            <Button align="right" variant="primary" type="submit" onClick={ login }>
                                                Log-In
                                            </Button>
                                        </div>
                                            <a href="forgotpassword">Forgot Password?</a>
                                </Form>
                        </div>
                </div>
            </div>
        )
    }
    
}

export default Login