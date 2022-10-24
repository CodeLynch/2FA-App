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

function App() {

  return(
    <Router>
      <Routes>
         <Route path="/" element={<div className='App-content'><Login /></div>} />
         <Route path="/register" element={<div className='App-content'><Register /></div>} />
         <Route path="/forgotpassword" element={<div className='App-content'><ForgotPass /></div>} />
         <Route path="/profile" element={<div><ProfileNav /><Profile /></div>} />
         <Route path="/resetpassword" element={<div className='App-content'><ResetPass /></div>} />
         <Route path="/otp" element={<div className='App-content'><OTPPage /></div>} />
      </Routes>
    </Router>
  );
  
}

export default App;
