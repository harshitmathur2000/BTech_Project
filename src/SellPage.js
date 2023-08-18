import React, { useState } from 'react';
import './SellPage.css';

function SellPage({ setSubmissions }) {
  const [itemTitle, setItemTitle] = useState('');
  const [itemPrice, setItemPrice] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [email, setEmail] = useState('');
  const [itemDetails, setItemDetails] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const newSubmission = {
      itemTitle,
      itemPrice,
      contactNumber,
      email,
      itemDetails,
    };
    setSubmissions((prevSubmissions) => [...prevSubmissions, newSubmission]);
    setItemTitle('');
    setItemPrice('');
    setContactNumber('');
    setEmail('');
    setItemDetails('');
  };


  return (
    <div className="page-container">
      <h2>Welcome to the Sell Page</h2>
      <div className="form-container">
        <h3>Sell Your Item</h3>
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
            Item Price:
            <input
              type="text"
              value={itemPrice}
              onChange={(e) => setItemPrice(e.target.value)}
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
          <label>
            Item Details:
            <textarea
              value={itemDetails}
              onChange={(e) => setItemDetails(e.target.value)}
              required
            />
          </label>
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
}
export default SellPage;
