import { BrowserRouter as Router, Route,Routes, Link } from 'react-router-dom';
import './App.css';
import HomePage from './homepage';
import BuyPage from './BuyPage';
import SellPage from './SellPage'; 
import RequestPage from './RequestPage'; 
import ViewRequestPage from './ViewRequestPage'; 
function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/buy" element={<BuyPage />} />
          <Route path="/sell" element={<SellPage />} />
          <Route path="/request" element={<RequestPage />} />
          <Route path="/view-request" element={<ViewRequestPage />} />
          <Route path="/" element={<HomePage />} />
        </Routes>
      </div>
    </Router>
      
    
  );
}

export default App;
