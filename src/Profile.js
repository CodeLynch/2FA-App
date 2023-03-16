import React, { useState, useEffect } from "react";
import Form from 'react-bootstrap/Form';
import Spinner from 'react-bootstrap/Spinner';
//import { useLocation } from "react-router-dom";
//import { useNavigate } from 'react-router-dom';
import Axios from 'axios';

const Profile = (props) =>{
    const [isLoading, setLoading] = useState(false)
    const [using2FA, set2FA] = useState(false)
    const [strongPass, setStrong] = useState(true);

    Axios.defaults.withCredentials = true;

    useEffect(()=>{
        Axios.get(`http://localhost:5000/users/${props.username}`).then((response)=>{
          if(response.data[0].use2FA === 1){
            set2FA(true);
          }else{
            set2FA(false);
          }
          if(response.data[0].strongPass === 1){
            setStrong(true);
          }else{
            setStrong(false);
          }
          setLoading(false);
        })
    }, [props.username])

    const update2FA = () =>{
        if(using2FA){
            Axios.put(`http://localhost:5000/off2FA/${props.username}`).then((response)=>{
            set2FA(false);
          })
        }else{
            Axios.put(`http://localhost:5000/on2FA/${props.username}`).then((response)=>{
            set2FA(true);
          })
        }
        
    };

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
        <div className="w-100">
            <div className="container" align="left" style={{height:"78vh"}}>
                    <div className="col-lg-8 px-5 py-5 row justify-content-left align-items-start text-start">
                        <h1 className="f1 mb-0 py-0">Welcome, {props.first} {props.last}!</h1>
                        <p className="mb-0 py-0">You have successfully logged in to your account.</p>
                        <Form>
                        <div key={`default-checkbox`} className="mb-3">
                        {strongPass?
                          <Form.Check   
                          type='checkbox'
                          id={`default-checkbox`}
                          label={`Activate 2FA`}
                          checked={using2FA}
                          onChange={update2FA}
                          />:<Form.Check   
                          disabled
                          type='checkbox'
                          id={`default-checkbox`}
                          label={`Activate 2FA`}
                          checked={using2FA}
                          />}
                
                        </div>
                        </Form>
                    </div>
            </div>
        </div>
    )
}

export default Profile