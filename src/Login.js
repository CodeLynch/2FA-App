import React from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const Login = () =>{
    return (
        <div className="w-100">
            <div className="container" align="center">
            <div className="col-lg-8 px-5 py-5 row justify-content-center text-start" maxWidth="sm">
                    <h1 className="f1">Log-In</h1>
                            <Form>
                                <Form.Group className="mb-3" controlId="formUsername">
                                        <Form.Control type="text" placeholder="Username" />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formPassword">
                                        <Form.Control type="password" placeholder="Password" />
                                </Form.Group>
                                    <div class="d-flex justify-content-between">
                                        <div>
                                        <Form.Text className="text-muted">
                                            Don't have an account? Register&nbsp;
                                        </Form.Text>
                                        <a href="/register">here</a>
                                        </div>
                                        <Button align="right" variant="primary" type="submit">
                                            Log-In
                                        </Button>
                                    </div>
                                        <a href="#">Forgot Password?</a>
                            </Form>
                    </div>
            </div>
        </div>
    )
}

export default Login