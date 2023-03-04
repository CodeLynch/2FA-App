import React, { useState, useEffect } from "react";
import Form from 'react-bootstrap/Form';
import Spinner from 'react-bootstrap/Spinner';
//import { useLocation } from "react-router-dom";
//import { useNavigate } from 'react-router-dom';
import Axios from 'axios';

const Profile = (props) =>{
    const [isLoading, setLoading] = useState(false)
    const [using2FA, set2FA] = useState(false)

    Axios.defaults.withCredentials = true;

    useEffect(()=>{
        Axios.get(`http://localhost:5000/users/${props.username}`).then((response)=>{
          if(response.data[0].use2FA === 1){
            set2FA(true);
          }else{
            set2FA(false);
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
                            checked={using2FA}
                            onChange={update2FA}
                        />
                        </div>
                        </Form>
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

export default Profile