import './Buttons.css';
import React, { useState } from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import Spinner from 'react-bootstrap/Spinner';
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
    const clearAlerts = () =>{
        setValidated(false);
        setInvalidLogIn(false);
        setLoginError('');
    } 
    let alertTag ="";
    if(invalidLogIn){
        alertTag = <Alert key="danger" variant="danger">{loginError}</Alert>        
    }
    if(validLogIn){
        window.location.reload();
    }
    if(isLoading){
        return <>
        <div className='container d-flex justify-content-center align-items-center' style={{height:"100vh", width:"200vw", background:"white"}}>
            <div className='d-flex justify-content-center flex-column'>
                <div className='d-flex justify-content-center'>
                    <Spinner className='m-3' animation="border" style={{height:"100px", width:"100px", color:"#de91ff"}} />
                </div>
            </div>
        </div>
        </>
    }else{
        return (
            <div className='d-flex flex-column w-100 h-100 main-background'>
                <div className='m-3 p-1'>
                    <img src="2falogo.png" height={85} width={130} alt="logo"/>
                </div>
                <div className="w-100 mt-3">
                    <div className="container bg-white shadow w-50 rounded" align="center">
                        <div className="col-lg-15 px-5 py-5 row justify-content-center text-start">
                                <h1 className="f1">Log-In</h1>
                                        {alertTag}
                                        <Form noValidate validated={validated} onSubmit={ handleSubmit }>
                                            <Form.Group className="mb-3" controlId="formUsername" onChange={(e)=>{setUsernameLog(e.target.value); clearAlerts()}}>
                                                    <Form.Control required type="text" placeholder="Username" maxLength={20} />
                                                    <Form.Control.Feedback type="invalid">
                                                        Please enter a username.
                                                    </Form.Control.Feedback>
                                            </Form.Group>

                                            <Form.Group className="mb-3" controlId="formPassword" onChange={(e)=>{setPasswordLog(e.target.value); clearAlerts()}}>
                                                    <Form.Control required type="password" placeholder="Password" maxLength={20}/>
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
                                                    <Button className="btn-ultra-voilet" align="right" type="submit" onClick={ login }>
                                                        Login
                                                    </Button>
                                                </div>
                                                    <a href="forgotpassword">Forgot Password?</a>
                                        </Form>
                        </div>
                    </div>
                </div>
                <footer className="d-flex justify-content-center align-items-end flex-row" style={{color:"grey", fontSize:".7rem"}}> 
                    <div className="d-flex justify-content-center">
                        This project was created to fulfill a requirement for CSIT335.
                    </div> 
                    <img className='mx-1' src="2falogoALT.png" height={35} width={50} alt="grey logo"/>
                </footer>            
            </div>
            
        )
    }
    
}

export default Login