import React from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const ForgotPass = () =>{
    return (
        <div className="w-100">
            <div className="container" align="center">
            <div className="col-lg-8 px-5 py-5 row justify-content-center text-start">
                    <h1 className="f1">Forgot Password?</h1>
                            <Form>
                                <Form.Label>Enter the email of your account to reset your password</Form.Label>
                                <div className="d-flex flex-row">
                                        <div className="flex-column flex-fill">
                                            <Form.Group className="mb-3" controlId="formEmail">
                                                <Form.Control type="email" placeholder="Email" />
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

export default ForgotPass