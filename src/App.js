import './App.css';
import Login from './Login';
import Register from './Register';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Routes, Route, useNavigate} from 'react-router-dom';
import ForgotPass from './ForgotPass';
import Profile from './Profile';
import ResetPass from './ResetPass';
import OTPPage from './OTPPage';
import ProfileNav from './ProfileNav';
import  Axios  from 'axios';
import { useEffect, useState } from 'react';

function App() {
    const nav = useNavigate()
    const [isLoading, setLoading] = useState(true)
    const [loggedIn, setLoggedIn] = useState(false)
    const [validLogIn, setValidLogIn] = useState(false)
    const [fname, setFName] = useState('')
    const [lname, setLName] = useState('')
    const [username, setUsername] = useState('')
    const [using2FA, set2FA] = useState(false)
    
    Axios.defaults.withCredentials = true;
    useEffect(()=>{
        Axios.get("http://localhost:5000/home").then((response)=>{
          setLoading(false);
          if(response.data.loggedIn === true){
              if(response.data.user[0].use2FA){
                set2FA(true);
                setValidLogIn(true);
              }else{
                set2FA(false);
                setValidLogIn(true);
                setLoggedIn(true);
                setUsername(response.data.user[0].username);
                setFName(response.data.user[0].firstname);
                setLName(response.data.user[0].lastname);
              }
          }else{
            setLoggedIn(false);
          }
        })
    }, [fname, lname])
  
  let mainPage=''
  if(isLoading){
    mainPage =<Route path="/" element={ <div className='App-content'><h1>LOADING...</h1></div>}/>
  }else{  
  if(loggedIn){
    mainPage =<Route path="/" element={<div><ProfileNav /><Profile first={fname} last={lname} username={username}/></div>}/>
  }else{
    mainPage =<Route path="/" element={<div className='App-content'><Login /></div>}/>
    if(using2FA && window.location.pathname !== "/otp"){
      nav('/otp');
    }
  }}

  return( 
      <Routes>
         {mainPage}
         <Route path="/register" element={<div className='App-content'><Register /></div>} />
         <Route path="/forgotpassword" element={<div className='App-content'><ForgotPass /></div>} />
         <Route path="/resetpassword" element={<div className='App-content'><ResetPass /></div>} />
         <Route path="/otp" element={<div className='App-content'><OTPPage isLoggedIn={validLogIn} /></div>} />
      </Routes>
  );
  
}

export default App;
