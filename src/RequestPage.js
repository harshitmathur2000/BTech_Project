import React, { useState } from 'react';
import './SellPage.css';

function RequestPage({ setRequests }) {
  const [itemTitle, setItemTitle] = useState('');
  const [requestType, setRequestType] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [email, setEmail] = useState('');
  const handleSubmit = (e) => {
    e.preventDefault();
    const newRequest = {
      itemTitle,
      requestType,
      contactNumber,
      email
    };
    setRequests((prevRequests) => [...prevRequests, newRequest]);
    setItemTitle('');
    setRequestType('');
    setContactNumber('');
    setEmail('');

  };
  return (
    <div className="page-container">
      <h2>Welcome to the Request Page</h2>
      <div className="form-container">
        <h3>Make your Request</h3>
        <form onSubmit={handleSubmit} className="sell-form">
          <label>
            Item Title:
            <input
              type="text"
              value={itemTitle}
              onChange={(e) => setItemTitle(e.target.value)}
              required
            />
          </label>
          <label>
            Request type:
            <input
              type="text"
              value={requestType}
              onChange={(e) => setRequestType(e.target.value)}
              required
            />
          </label>
          <label>
            Contact Number:
            <input
              type="tel"
              value={contactNumber}
              onChange={(e) => setContactNumber(e.target.value)}
              required
            />
          </label>
          <label>
            Email:
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );

  
}

export default RequestPage;
