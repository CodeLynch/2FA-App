import React, { useState, useEffect } from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import { InputGroup } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';
import Axios from 'axios';
import { AiFillEyeInvisible, AiFillEye} from 'react-icons/ai'


const ResetPass = (props) =>{
        const location = useLocation()
        const nav = useNavigate() 
        const [password, setPassword] = useState('')
        const [repassword, setRepassword] = useState('')
        const [invalidPass, setInvalid] = useState('')
        const [PassReq, setPassReq] = useState(<></>)
        const [PassStr, setPassStr] = useState(<></>)
        const [isPassStrong, setStrong] = useState(false)
        const [Def2FA, set2FA] = useState(false);
        const [showPass, setShowPass] = useState(false);
        const [showRePass, setShowRePass] = useState(false);
        let alertTag ='';
        
        //if no state is passed that means the user did not redirect from otp page and is not verified yet
        useEffect(()=>{
                if(location.state === null){
                    nav('/');
                }
            }, [nav, location.state])
        
        useEffect(()=>{
                if(!isPassStrong){
                        set2FA(true)
                }
        },[isPassStrong])

        const countReq = (caps, low, num, sym, len) => {
                let count = 0
                if(caps){
                        count += 1;
                }
                if(low){
                        count += 1;
                }
                if(num){
                        count += 1;
                }
                if(sym){
                        count += 1;
                }
                if(len){
                        count += 1
                }

                return count;
        }
        const checkPassword = () => {
                let caps = (password.match(/[A-Z]/g) || []).length > 0;
                let low = (password.match(/[a-z]/g) || []).length > 0;
                let num = (password.match(/[0-9]/g) || []).length > 0;
                let sym = (password.match(/\W/g) || []).length > 0;
                let len = password.length > 11;
                if ((!caps || 
                        !low || 
                        !num || 
                        !sym || 
                        !len) && 
                        password.length > 0){
                        setStrong(false)
                        setPassReq(<Alert key="info" variant="info">
                        <p>Strong passwords have the following requirements:</p>
                        <ul>
                                {caps?<></>:<li>MUST contain at least one uppercase letter.</li>}
                                {low?<></>:<li>MUST contain at least one lowercase letter.</li>}
                                {num?<></>:<li>MUST contain at least one number.</li>}
                                {sym?<></>:<li>MUST contain at least one special character.</li>}
                                {len?<></>:<li>MUST have at least 12 characters.</li>}
                        </ul>
                        </Alert>)

                        if(countReq(caps, low, num, sym, len) > 2){
                                setPassStr(<p>Password Strength: <b>Medium</b></p>)
                        }else{
                                setPassStr(<p>Password Strength: <b>Weak</b></p>)
                        }
                }else{
                        setPassReq(<></>);
                        setStrong(true);
                        password.length > 0? setPassStr(<p>Password Strength: <b>Strong</b></p>):setPassStr(<></>)
                }
        }

        const updatePassword = () =>{
                if(password !== "" && repassword !== ""){
                        if(password.length < 20 && repassword.length < 20){
                                if(password === repassword){
                                        Axios.post('http://localhost:5000/changePass', {
                                        email: location.state.email,
                                        newPass: password,
                                        strongPass: isPassStrong,
                                        use2FA: Def2FA
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

        useEffect(()=>{
                checkPassword()
        },[password]);

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
                        <div className="w-100 forgot-background d-flex flex-column">
                                <div className='d-flex p-5 justify-content-center'>
                                        <img src="2falogo.png" height={85} width={130} alt="logo"/>
                                </div>
                        <div className="container" align="center">
                        <div className="col-lg-15 p-5 row bg-white shadow w-50 rounded justify-content-center text-start" >
                                <h1 className="f1">Reset Password</h1>
                                <p> Enter your new password</p>
                                {alertTag}
                                        <Form noValidate validated={validated} onSubmit={handleSubmit}>
                                                {PassReq}
                                                <InputGroup className="mb-1" controlId="formNewPass" onChange={(e)=>{setPassword(e.target.value)}}>
                                                        <Form.Control required type={showPass?"text":"password"} placeholder="New Password" />
                                                        <Form.Control.Feedback type="invalid">
                                                        Please enter a password.
                                                        </Form.Control.Feedback>
                                                        <Button id="button-addon2" variant="outline-primary" onClick={()=>{setShowPass(!showPass)}}>{showPass?<AiFillEyeInvisible/>:<AiFillEye/>}</Button>
                                                </InputGroup>
                                                {PassStr}
                                                <InputGroup className="mb-1" controlId="formRePass" onChange={(e)=>{setRepassword(e.target.value)}}>
                                                        <Form.Control required type={showRePass?"text":"password"} placeholder="Re-type Password" />
                                                        <Form.Control.Feedback type="invalid">
                                                        Please re-type your new password
                                                        </Form.Control.Feedback>
                                                        <Button id="button-addon2" variant="outline-primary" onClick={()=>{setShowRePass(!showRePass)}}>{showRePass?<AiFillEyeInvisible/>:<AiFillEye/>}</Button>
                                                </InputGroup>
                                                <div className="d-flex justify-content-end">
                                                                <Button className="btn-plum" align="right" type="submit" onClick={updatePassword}> 
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