import { BrowserRouter as Router, Route,Routes } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import './App.css';
import HomePage from './homepage';
import BuyPage from './BuyPage';
import SellPage from './SellPage'; 
import RequestPage from './RequestPage'; 
import ViewRequestPage from './ViewRequestPage'; 
import Signup from './signup';
import Login from './login';
import { auth } from './firebaseConfig';
function App() {
  const [submissions, setSubmissions] = useState([]);
  const [requests, setRequests] = useState([]);
  const [userName, setUserName] = useState(""); 
  useEffect(()=>{
    auth.onAuthStateChanged((user)=>{
      if(user){
        setUserName(user.displayName)
      }
      else{
        setUserName("")
      }
    });
  },[])
  return (
    
    <Router>
      <div>
        {/* <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
           
          </ul>
        </nav> */}
        <Routes>
          <Route path="/buy" element={<BuyPage submissions={submissions}/>} />
          <Route path="/sell" element={<SellPage setSubmissions={setSubmissions}/>} />
          <Route path="/request" element={<RequestPage setRequests = {setRequests}/>} />
          <Route path="/view-request" element={<ViewRequestPage requests = {requests}/>} />
          <Route path = "/signup" element = {<Signup/>} />
          <Route path = "/" element = {<Login/>} />
          <Route path="/homePage" element={<HomePage />} />
        </Routes>
      </div>
    </Router>
      
    
  );
}

export default App;
