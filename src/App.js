import './App.css';
import Login from './Login';
import Register from './Register';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Routes, Route, useLocation} from 'react-router-dom';
import ForgotPass from './ForgotPass';
import Profile from './Profile';
import ResetPass from './ResetPass';
import OTPPage from './OTPPage';
import ProfileNav from './ProfileNav';
import  Axios  from 'axios';
import { useEffect, useState } from 'react';

function App() {
    const [isLoading, setLoading] = useState(true)
    const [loggedIn, setLoggedIn] = useState(false)
    //const [validLogIn, setValidLogIn] = useState(false)
    const [fname, setFName] = useState('')
    const [lname, setLName] = useState('')
    const [username, setUsername] = useState('')
    //const [using2FA, set2FA] = useState(false)
    const location = useLocation();
    
    Axios.defaults.withCredentials = true;
    useEffect(()=>{
        Axios.get("http://localhost:5000/home").then((response)=>{
          setLoading(false);
          if(response.data.loggedIn === true){
                setLoggedIn(true);
                setUsername(response.data.user[0].username);
                setFName(response.data.user[0].firstname);
                setLName(response.data.user[0].lastname);
          }else{
            setLoggedIn(false);
          }
        })

    }, [fname, lname, location.state])
  
  if(isLoading){
    return( 
      <Routes>
         <Route path="/" element={ <div className='App-content'><h1>LOADING...</h1></div>}/>
      </Routes>
     );
    
  }else{  
  if(loggedIn){
    return( 
      <Routes>
         <Route path="/" element={<div><ProfileNav /><Profile first={fname} last={lname} username={username}/></div>}/>
      </Routes>
     );
  }else{
    return( 
      <Routes>
         <Route path="/" element={<div className='App-content main-background'><Login /></div>}/>
         <Route path="/register" element={<div className='App-content main-background'><Register /></div>} />
         <Route path="/forgotpassword" element={<div className='App-content forgot-background'><ForgotPass /></div>} />
         <Route path="/resetpassword" element={<div className='App-content'><ResetPass /></div>} />
         <Route path="/otp" element={<div className='App-content'><OTPPage/></div>} />
      </Routes>
     );
  }}
  
}

export default App;
