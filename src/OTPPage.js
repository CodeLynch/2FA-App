import React, { useState, useEffect } from "react";
import OTPInput, { ResendOTP } from "otp-input-react";
import Button from 'react-bootstrap/Button';
import Axios from 'axios';
import Alert from 'react-bootstrap/Alert';
import { useLocation, useNavigate } from "react-router-dom";


const OTPPage = () =>{
        const location = useLocation();
        const nav = useNavigate();
        const [OTP, setOTP] = useState('')
        const [allowResend, setResend] = useState(false)
        const [invalidOTP, setInvalid] = useState(false)
        
        //if no state is passed that means the user did not submit an email or a login
        useEffect(()=>{
            if(location.state === null){
                nav('/');
            }
        }, [nav, location.state])

        //Send a new otp if timer is done
        const handleResend = () => {
            if(!allowResend){
                alert("Please wait until the timer ends");
            }else{
                Axios.get("http://localhost:5000/otp").then((response)=>{
                        window.location.reload();
                })
            }
        };

        
        const submitOTP = () => {
            if(location.state.forgotPass === true){
                Axios.post("http://localhost:5000/resetPassOtp", {otp: OTP}).then((response) => {
                if(response.data.isSuccess === true){
                        nav("/resetpassword", {state: {otpSuccess:true, email:location.state.email}});
                    
                }else{
                    setInvalid(true);
                }
            })
            }else{
                Axios.post("http://localhost:5000/2FAOtp", {otp: OTP}).then((response) => {
                if(response.data.isSuccess === true){
                        nav("/", {state: {reload:true}});
                    
                }else{
                    setInvalid(true);
                }
            })

            }
            

        };

        const renderButton = (buttonProps) => {
            return <div className="d-flex align-items-center justify-content-left p-0">
                    <Button onClick={handleResend} className="mx-0 p-0" align="left" variant="link text-decoration-none" type="submit">
                    Resend OTP?</Button><span className="mx-0 px-2">{buttonProps.remainingTime}s</span>
                   </div>
          };
          const renderTime = () => React.Fragment;

          let alertTag ="";
          if(invalidOTP){
              alertTag = <Alert key="danger" variant="danger">Invalid OTP</Alert>        
          }
         
              return (
                        <div className="w-100">
                            <div className="container" align="center">
                                <div className="col-lg-8 px-5 py-5 row justify-content-center text-start" >
                                        <h1 className="f1">Verify it's you</h1>
                                        <p>We've sent an OTP to your email, Please input the sent code to verify that you own this account</p>
                                        {alertTag}
                                        <OTPInput inputStyles={{ height:"70px", width:"70px" , fontSize:"2em"}} value={OTP} onChange={setOTP} autoFocus OTPLength={4} otpType="number" disabled={false} />
                                        <ResendOTP maxTime={120} renderButton={renderButton} renderTime = {renderTime} onTimerComplete={() => setResend(true)}/>
                                        <div className="d-inline-flex justify-content-end">
                                            <Button align="right" variant="primary" type="submit" onClick={submitOTP}>
                                                Verify
                                            </Button>
                                        </div>
                                </div>
                                
                            </div>
                        </div>
                )
}

export default OTPPage