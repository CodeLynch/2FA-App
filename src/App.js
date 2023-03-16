import './index.css';
import './App.css';
import Login from './Login';
import Register from './Register';
import AppFooter from './AppFooter';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Routes, Route, useLocation} from 'react-router-dom';
import ForgotPass from './ForgotPass';
import Profile from './Profile';
import ResetPass from './ResetPass';
import OTPPage from './OTPPage';
import ProfileNav from './ProfileNav';
import  Axios  from 'axios';
import Spinner from 'react-bootstrap/Spinner';
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
         <Route path="/" element={ <div className='App-content'><>
         <div className='container d-flex justify-content-center align-items-center' style={{height:"100vh", width:"200vw", background:"white"}}>
                <div className='d-flex justify-content-center flex-column'>
                    <div className='d-flex justify-content-center'>
                        <Spinner className='m-3' animation="border" style={{height:"100px", width:"100px", color:"#de91ff"}} />
                    </div>
                </div>
          </div>
        </></div>}/>
      </Routes>
     );
    
  }else{  
  if(loggedIn){
    return( 
      <Routes>
         <Route path="/" element={<><div><ProfileNav /><Profile first={fname} last={lname} username={username}/></div><AppFooter/></>}/>
      </Routes>
     );
  }else{
    return( 
      <Routes>
         <Route path="/" element={<><div className='App-content'><Login /></div><AppFooter/></>}/>
         <Route path="/register" element={<><div className='App-content'><Register /></div><AppFooter/></>} />
         <Route path="/forgotpassword" element={<><div className='App-content'><ForgotPass /></div><AppFooter/></>} />
         <Route path="/resetpassword" element={<><div className='App-content'><ResetPass /></div><AppFooter/></>} />
         <Route path="/otp" element={<><div className='App-content'><OTPPage/></div><AppFooter/></>} />
      </Routes>
     );
  }}
  
}

export default App;
