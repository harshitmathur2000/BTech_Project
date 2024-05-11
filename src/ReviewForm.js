// ReviewForm.js
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { firestore } from './firebaseConfig';

const ReviewForm = () => {
  const { userId } = useParams();
  const [rating, setRating] = useState('');
  const [text, setText] = useState('');
  const history = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await firestore.collection('feedback').add({
        userId,
        rating,
        text,
      });
      console.log(userId);
      history.push(`/profile/${userId}`);
    } catch (error) {
      console.error('Error adding feedback:', error);
    }
  };

  return (
    <div>
      <h2>Write a Review</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Rating:
          <input
            type="number"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          Feedback:
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            required
          />
        </label>
        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default ReviewForm;
