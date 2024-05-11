// FeedbackPage.js
import React, { useState } from 'react';
import { firestore, auth } from './firebaseConfig';
import './FeedbackPage.css'; // Import the CSS file for styling

const FeedbackPage = () => {
  const [feedbackText, setFeedbackText] = useState('');
  const [rating, setRating] = useState(0);

  const user = auth.currentUser;

  const handleFeedbackTextChange = (e) => {
    setFeedbackText(e.target.value);
  };

  const handleRatingChange = (e) => {
    setRating(e.target.value);
  };

  const handleSubmitFeedback = async (e) => {
    e.preventDefault();

    // Check if there's a logged-in user
    if (!user) {
      console.error('User is not logged in');
      return;
    }

    try {
      // Add a new document with the feedback data to the "feedback" collection
      await firestore.collection('feedback').add({
        userId: user.uid,
        feedbackText,
        rating: parseInt(rating, 10),
        timestamp: new Date(),
      });

      // Clear the feedback form fields after successful submission
      setFeedbackText('');
      setRating(0);

      console.log('Feedback submitted successfully!');
    } catch (error) {
      console.error('Error submitting feedback:', error);
    }
  };

  return (
    <div className="page-container">
      <h2>Please Provide Your Feedback</h2>
      <div className="feedback-container">
        <h3>Provide Your Feedback</h3>
        <form onSubmit={handleSubmitFeedback} className="feedback-form">
          <label>
            Feedback:
            <textarea
              value={feedbackText}
              onChange={handleFeedbackTextChange}
              required
            />
          </label>
          <label>
            Rating (out of 10):
            <input
              type="number"
              value={rating}
              onChange={handleRatingChange}
              min="0"
              max="10"
              required
            />
          </label>
          <button type="submit">Submit Feedback</button>
        </form>
      </div>

      <div className="contact-section">
        <h3>Contact Us</h3>
        <p>
          If you have any issues or concerns, please feel free to contact us at:
          <br />
          Email: bhat.1@iitj.ac.in
          <br />
          Email: mathur.6@iitj.ac.in
          <br />
          Phone: +91 - 8591149894
          <br />
          Phone: +91 - 9352370533
        </p>
      </div>
    </div>
  );
};

export default FeedbackPage;