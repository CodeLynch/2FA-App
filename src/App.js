import './App.css';
import Login from './Login';
import Register from './Register';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import ForgotPass from './ForgotPass';
import Profile from './Profile';
import ResetPass from './ResetPass';
import OTPPage from './OTPPage';
import ProfileNav from './ProfileNav';
import  Axios  from 'axios';
import { useEffect, useState } from 'react';

function App() {
    const [loggedIn, setLoggedIn] = useState(false)
    const [fname, setFName] = useState('')
    const [lname, setLName] = useState('')

    Axios.defaults.withCredentials = true;
    useEffect(()=>{
        Axios.get("http://localhost:5000/home").then((response)=>{
          console.log(response);
          if(response.data.loggedIn === true){
            console.log("this is happening");
            setLoggedIn(true);
            setFName(response.data.user[0].firstname);
            setLName(response.data.user[0].lastname);
            console.log("You are " + {fname} + " " + {lname})
          }else{
            console.log("I hear nothing");
          }
        })
    }, [fname, lname])
   let mainPage =<Route path="/" element={<div className='App-content'><Login /></div>} />;
   if(loggedIn){
       mainPage =<Route path="/" element={<div><ProfileNav /><Profile first={fname} last={lname} /></div>} />;
   }

  return(
    <Router>
      <Routes>
         {mainPage}
         <Route path="/register" element={<div className='App-content'><Register /></div>} />
         <Route path="/forgotpassword" element={<div className='App-content'><ForgotPass /></div>} />
         <Route path="/resetpassword" element={<div className='App-content'><ResetPass /></div>} />
         <Route path="/otp" element={<div className='App-content'><OTPPage /></div>} />
      </Routes>
    </Router>
  );
  
}

export default App;
