import React, { useState } from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Axios  from "axios";
import { useNavigate } from "react-router-dom";
import Alert from 'react-bootstrap/Alert';

const ForgotPass = () =>{
    const [emailIn, setEmail] = useState('');
    const [validated, setValidated] = useState(false);
    const [invalidEmail, setInvalid] = useState(false);
    const [errMessage, setErrMessage] = useState('');
    const [isLoading, setLoading] = useState(false);
    let allowPost = false;
    const nav = useNavigate();


    const resetPass = () =>{
        Axios.post('http://localhost:5000/emails', {
        email: emailIn,
        }).then((response) =>{
            if(response.data.isSuccess === false){
                setErrMessage(response.data.message);
                setInvalid(true);
            }else{
                if(!invalidEmail){
                    setLoading(true);
                    Axios.get(`http://localhost:5000/otp/${emailIn}`).then((response)=>{
                        if(response.data.message){
                            nav('/otp', {state: {forgotPass:true, email: emailIn} })
                        }                       
                    })    
                }
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
            setInvalid(true);
            setErrMessage('Invalid Input')
          }else{
            allowPost = true;
          }
        setValidated(true); 
        if(allowPost){
            resetPass();
        }
    };

    let alertTag ="";
    if(invalidEmail){
        alertTag = <Alert key="danger" variant="danger">{errMessage}</Alert>        
    }
    if(isLoading){
        return <h1>LOADING...</h1>
    }else{
        return (
            <div className="w-100">
                <div className="container" align="center">
                <div className="col-lg-8 px-5 py-5 row justify-content-center text-start">
                        <h1 className="f1">Forgot Password?</h1>
                                <Form noValidate validated={validated} onSubmit={handleSubmit}>
                                    <Form.Label>Enter the email of your account to reset your password</Form.Label>
                                    {alertTag}
                                    <div className="d-flex flex-row">
                                            <div className="flex-column flex-fill">
                                                 <Form.Group className="mb-1" controlId="formEmail" onChange={(e)=>{setEmail(e.target.value); setInvalid(false); setValidated(false)}}>
                                                        <Form.Control required type="email" placeholder="Email" />
                                                        <Form.Control.Feedback type="invalid">
                                                        Please enter your email.
                                                        </Form.Control.Feedback>
                                                </Form.Group>
                                            </div>  
                                            <div className="flex-column">  
                                                <Button align="right" variant="primary" type="submit">
                                                    Reset Password
                                                </Button>
                                            </div>
                                    </div>    
                                </Form>
                        </div>
                </div>
            </div>
        )
    }
    
}

export default ForgotPass