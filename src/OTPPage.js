import React, { useState, useEffect } from "react";
import OTPInput, { ResendOTP } from "otp-input-react";
import Button from 'react-bootstrap/Button';
import Axios from 'axios';
import Alert from 'react-bootstrap/Alert';
import { useLocation, useNavigate } from "react-router-dom";
import Spinner from 'react-bootstrap/Spinner';


const OTPPage = () =>{
        const location = useLocation();
        const nav = useNavigate();
        const [OTP, setOTP] = useState('')
        const [allowResend, setResend] = useState(false)
        const [invalidOTP, setInvalid] = useState(false)
        const [isLoading, setLoading] = useState(false)
        
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
                setLoading(true);
                Axios.get("http://localhost:5000/otp").then((response)=>{
                    setLoading(false);    
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
          }
              return (
                        <div className="w-100 d-flex otp-background flex-column">
                            <div className='m-3 p-1'>
                                <img src="2falogo.png" height={85} width={130} alt="logo"/>
                            </div>
                            <div className="container d-flex justify-content-center align-items-center " align="center">
                                <div className="col-lg-15 p-5 row bg-white shadow w-50 rounded justify-content-center text-start" >
                                        <h1 className="f1">Verify it's you</h1>
                                        <p>We've sent an OTP to your email, Please input the sent code to verify that you own this account</p>
                                        {alertTag}
                                        <OTPInput inputStyles={{ height:"70px", width:"70px" , fontSize:"2em"}} value={OTP} onChange={setOTP} autoFocus OTPLength={4} otpType="number" disabled={false} />
                                        <ResendOTP maxTime={120} renderButton={renderButton} renderTime = {renderTime} onTimerComplete={() => setResend(true)}/>
                                        <div className="d-inline-flex justify-content-end">
                                            <Button className="btn-plum" align="right" variant="primary" type="submit" onClick={submitOTP}>
                                                Verify
                                            </Button>
                                        </div>
                                </div>
                                
                            </div>
                            <footer className="d-flex justify-content-center align-items-end flex-row" style={{color:"grey", fontSize:".7rem"}}> 
                                <div className="d-flex justify-content-center">
                                 This project was created to fulfill a requirement for CSIT335.
                                </div> 
                                <img className='m-1' src="2falogoALT.png" height={35} width={50} alt="grey logo"/>
                            </footer> 
                        </div>
                )
}

export default OTPPage