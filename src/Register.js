import React from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const Register = () =>{
    return (
        <div className="w-100">
            <div className="container" align="center">
            <div className="col-lg-8 px-5 py-5 row justify-content-center text-start" maxWidth="sm">
                    <h1 className="f1">Registration</h1>
                            <Form>
                                <Form.Group className="mb-1" controlId="formFirstName">
                                        <Form.Control type="text" placeholder="First Name" />
                                </Form.Group>
                                <Form.Group className="mb-1" controlId="formLastName">
                                        <Form.Control type="text" placeholder="Last Name" />
                                </Form.Group>
                                <Form.Group className="mb-1" controlId="formEmail">
                                        <Form.Control type="email" placeholder="Email" />
                                </Form.Group>
                                <Form.Group className="mb-1" controlId="formUsername">
                                        <Form.Control type="text" placeholder="Username" />
                                </Form.Group>
                                <Form.Group className="mb-1" controlId="formPassword">
                                        <Form.Control type="password" placeholder="Password" />
                                </Form.Group>
                                    <div class="d-flex justify-content-end">
                                        <Button align="right" variant="primary" type="submit">
                                            Register
                                        </Button>
                                    </div>
                            </Form>
                    </div>
            </div>
        </div>
    )
}

export default Register