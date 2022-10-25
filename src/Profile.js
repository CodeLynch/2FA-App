import React from "react";
import Form from 'react-bootstrap/Form';
//import { useLocation } from "react-router-dom";
//import { useNavigate } from 'react-router-dom';
//import Axios from 'axios';

const Profile = (props) =>{
    
    return (
        <div className="w-100">
            <div className="container" align="left">
                    <div className="col-lg-8 px-5 py-5 row justify-content-left align-items-start text-start">
                        <h1 className="f1 mb-0 py-0">Welcome, {props.first} {props.last}!</h1>
                        <p className="mb-0 py-0">You have successfully logged in to your account.</p>
                        <Form>
                        <div key={`default-checkbox`} className="mb-3">
                        <Form.Check 
                            type='checkbox'
                            id={`default-checkbox`}
                            label={`Activate 2FA`}
                        />
                        </div>
                        </Form>
                    </div>
            </div>
        </div>
    )
}

export default Profile