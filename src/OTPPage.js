import React, { useState, useEffect } from "react";
import OTPInput, { ResendOTP } from "otp-input-react";
import Button from 'react-bootstrap/Button';
import Axios from 'axios';
import { useNavigate } from "react-router-dom";


const OTPPage = (props) =>{
        const nav = useNavigate();
        const [OTP, setOTP] = useState('')
        const [allowSend, setAllowSend] = useState(true)
        

        useEffect(()=>{
            if(!props.isLoggedIn){
                nav('/');
            }else{
                if(allowSend){
                Axios.get("http://localhost:5000/otp").then((response)=>{
                        setAllowSend(false);
                })
                }
            }
        }, [allowSend, nav, props.isLoggedIn])

        const renderButton = (buttonProps) => {
            return <div className="d-flex align-items-center justify-content-left p-0">
                    <Button className="mx-0 p-0" align="left" variant="link text-decoration-none" type="submit">
                    Resend OTP?</Button><span className="mx-0 px-2">{buttonProps.remainingTime}s</span>
                   </div>
          };
          const renderTime = () => React.Fragment;

        // const handleSubmit = event => {
        //         event.preventDefault(); 
        //         const form = event.currentTarget;
        //         if (form.checkValidity() === false) {
        //             event.preventDefault();
        //             event.stopPropagation();
        //           }
        //       };
         
              return (
                        <div className="w-100">
                            <div className="container" align="center">
                                <div className="col-lg-8 px-5 py-5 row justify-content-center text-start" >
                                        <h1 className="f1">Verify it's you</h1>
                                        <p>We've sent an OTP to your email, Please input the sent code to verify that you own this account</p>
                                        <OTPInput inputStyles={{ height:"70px", width:"70px" , fontSize:"2em"}} value={OTP} onChange={setOTP} autoFocus OTPLength={4} otpType="number" disabled={false} />
                                        <ResendOTP maxTime={120} renderButton={renderButton} renderTime = {renderTime} ResendClick={() => console.log("Resend clicked")} />
                                        <div className="d-inline-flex justify-content-end">
                                            <Button align="right" variant="primary" type="submit" /*onClick={register}*/>
                                                Verify
                                            </Button>
                                        </div>
                                </div>
                                
                            </div>
                        </div>
                )
}

export default OTPPage