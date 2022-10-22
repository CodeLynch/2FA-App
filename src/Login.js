import React, { useState } from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import { useNavigate } from 'react-router-dom';
import Axios from 'axios';

const Login = (props) =>{
    const [usernameLog, setUsernameLog] = useState('')
    const [passwordLog, setPasswordLog] = useState('')
    const [alertClass, setAlertClass] = useState(props.alertClass)
    const [alertMsg, setAlertMsg] = useState(props.alertMsg)
    let navigate = useNavigate()

    const login = () =>{
        if(usernameLog !== "" && passwordLog !== ""){
            Axios.post('http://localhost:5000/login', {
            username: usernameLog,
            password: passwordLog,
            }).then((response) =>{
            console.log(response);
            if(response.data.message){
                setAlertClass()
                setAlertClass(response.data.alertClass)
                setAlertMsg(response.data.message)
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

    let alertTag ="";
    if(alertMsg !== undefined){
        console.log(alertMsg);
        alertTag = <Alert key={alertClass} variant={alertClass}>{alertMsg}</Alert>
    }
    
    return (
        <div className="w-100">
            <div className="container" align="center">
            <div className="col-lg-8 px-5 py-5 row justify-content-center text-start">
                    <h1 className="f1">Log-In</h1>
                            {alertTag}
                            <Form noValidate validated={validated} onSubmit={ handleSubmit }>
                                {/* <Form.Label className="text-danger">{loginMsg}</Form.Label> */}
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
                                        <a href="/register">here</a>
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

export default Login