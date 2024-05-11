import { BrowserRouter as Router, Route, Routes, Link, useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import './App.css';
import HomePage from './homepage';
import BuyPage from './BuyPage';
import SellPage from './SellPage';
import RequestPage from './RequestPage';
import ViewRequestPage from './ViewRequestPage';
import Signup from './signup';
import MyItemsPage from './myItems';
import Login from './login';
import FeedbackPage from './feedback';
import { auth } from './firebaseConfig';
import ProfilePage from './ProfilePage';
import ChatBot from 'react-simple-chatbot';
import { ThemeProvider } from 'styled-components';


function App() {
  const [userName, setUserName] = useState("");
  const { userId } = useParams();
  const profileUrl = `/profile/${userId}`;
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setUserName(user.displayName)
      }
      else {
        setUserName("")
      }
    });
  }, [])
  const steps = [
    {
      id: '0',
      message: 'Hey User!',
      trigger: '1',
    }, {
      id: '1',
      message: 'Please write your username',
      trigger: '2'
    }, {
      id: '2',
      user: true,
      trigger: '3',
    }, {
      id: '3',
      message: `Hi {previousValue}, how can I help you, ${userName}?`,
      trigger: '4'
    }, {
      id: '4',
      options: [
        {
          value: 1,
          label: 'Report a user',
          trigger: '5',
        },
        {
          value: 2,
          label: 'Report app issue',
          trigger: '11',
        },
        { value: 3, label: 'Need help' },
      ],
    }, {
      id: '5',
      message: 'Which User do you want to Report?',
      trigger: '6',
    }, {
      id: '6',
      user: true,
      trigger: '7',
      delay: 1000,
    }, {
      id: '7',
      message: 'What problem did the {previousValue} cause?',
      trigger: '8',
    }, {
      id: '8',
      user: true,
      trigger: '9',
      delay: 1000,
    }, {
      id: '9',
      message: 'We have taken note of that. Kindly write a warning message on his profile page as well.',
      trigger: '4',
    }, {
      id: '10',
      options: [
        {
          value: 2,
          label: 'Report app issue',
          trigger: '11',
        },
        { value: 3, label: 'Need help' },
      ],
    },{
      id: '11',
      component: (
        <a href="http://localhost:3000/feedback" target="_blank" rel="noopener noreferrer">
          Click here to provide feedback
        </a>
      ),
      end: true,
    }
  ];
  

  const theme = {
    background: '#C9FF8F',
    headerBgColor: '#197B22',
    headerFontSize: '20px',
    botBubbleColor: '#0F3789',
    headerFontColor: 'white',
    botFontColor: 'white',
    userBubbleColor: '#FF5733',
    userFontColor: 'white',
  };

  const config = {
    floating: true,
  };

  return (
    <div>
     
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
            <Route path="/buy" element={<BuyPage />} />
            <Route path="/sell" element={<SellPage />} />
            <Route path="/request" element={<RequestPage />} />
            <Route path="/view-request" element={<ViewRequestPage />} />
            <Route path="/myItems" element={<MyItemsPage />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/" element={<Login />} />
            <Route path="/homePage" element={<HomePage />} />
            <Route path="/feedback" element={<FeedbackPage />} />
            <Route path="/profile/:userId" element={<ProfilePage />} />

          </Routes>
        </div>
      </Router>
      <ThemeProvider theme={theme}>
                <ChatBot
 
                    // This appears as the header
                    // text for the chat bot
                    headerTitle="HelpBot"
                    steps={steps}
                    {...config}
 
                />
            </ThemeProvider>
    </div>


  );
}

export default App;