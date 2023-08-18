import { BrowserRouter as Router, Route,Routes } from 'react-router-dom';
import React, { useState } from 'react';
import './App.css';
import HomePage from './homepage';
import BuyPage from './BuyPage';
import SellPage from './SellPage'; 
import RequestPage from './RequestPage'; 
import ViewRequestPage from './ViewRequestPage'; 
function App() {
  const [submissions, setSubmissions] = useState([]);
  const [requests, setRequests] = useState([]);
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
          <Route path="/" element={<HomePage />} />
        </Routes>
      </div>
    </Router>
      
    
  );
}

export default App;
