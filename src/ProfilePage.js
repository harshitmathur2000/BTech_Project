import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { firestore, auth } from './firebaseConfig';
import { firebase } from './firebaseConfig';
import BuyCard from './BuyCard';
import RequestedCard from './RequestedCard';
import emailjs from '@emailjs/browser';

const ProfilePage = () => {
  const { userId } = useParams();
  const [userProfile, setUserProfile] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState("");
  const [userItems, setUserItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [canSubmitReview, setCanSubmitReview] = useState(true);
  const [showReportForm, setShowReportForm] = useState(false);
  const [reportReason, setReportReason] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const userProfileRef = firestore.collection('users').doc(userId);
      const doc = await userProfileRef.get();
      if (doc.exists) {
        setUserProfile(doc.data());
        setReviews(doc.data().myReviews || []);
      } else {
        console.log('No such user profile!');
      }

      const itemsData = await fetchUserItems(userId);
      setUserItems(itemsData);
      setIsLoading(false);

      const currentUser = auth.currentUser;
      setCanSubmitReview(!(currentUser && currentUser.uid === userId));
    };

    fetchData();
  }, [userId]);

  const fetchUserItems = async (userId) => {
    const items = [];
    const userDocRef = firestore.collection('users').doc(userId);
    const userDoc = await userDocRef.get();
    if (userDoc.exists) {
      const userData = userDoc.data();
      const myItems = userData.myItems || [];
      const myRequestedItems = userData.myRequestedItems || [];
      const itemsToSellCollection = firestore.collection('itemsToSell');
      const requestedItemsCollection = firestore.collection('requestedItems');

      const itemsToSellData = await fetchItems(itemsToSellCollection, myItems);
      const requestedItemsData = await fetchItems(requestedItemsCollection, myRequestedItems);

      return [...itemsToSellData, ...requestedItemsData];
    }
    return items;
  };

  const fetchItems = async (collection, itemIds) => {
    const items = [];
    if (itemIds.length > 0) {
      const query = await collection.where(firebase.firestore.FieldPath.documentId(), 'in', itemIds).get();
      query.forEach(doc => {
        items.push({ id: doc.id, ...doc.data() });
      });
    }
    return items;
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    if (!canSubmitReview) {
      console.error("Cannot submit a review for your own profile.");
      return;
    }

    const userDocRef = firestore.collection('users').doc(userId);

    try {
      await userDocRef.update({
        myReviews: firebase.firestore.FieldValue.arrayUnion(newReview)
      });

      setReviews([...reviews, newReview]); // Append new review to the list
      setNewReview(""); // Clear the review input after submitting

      console.log('Review added successfully!');
    } catch (error) {
      console.error('Error adding review:', error);
    }
  };

  const handleReportUser = () => {
    setShowReportForm(true);
  };

  const handleReportSubmit = async (e) => {
    e.preventDefault();

    // Send email to reported user
    const templateParams = {
      to_name: userProfile.displayName,
      reportedUser_email: userProfile.email,
      message: reportReason
    };

    // Send email to reported user
    emailjs.send('service_vyuwqbi', 'template_2zz6n6c', templateParams, '4ZSvM_drgFdb3XVYE');

    // Send email to admin
    const currentUser = auth.currentUser;
    if (currentUser) {
      const adminEmail = 'mathur.6@iitj.ac.in';
      emailjs.send('service_vyuwqbi', 'template_1krk4uk', {
        from_name: currentUser.displayName,
        newEmail : adminEmail,
        reported_user: userProfile.email,
        message: reportReason
      }, '4ZSvM_drgFdb3XVYE');
    }

    // Reset form and hide report form
    setReportReason("");
    setShowReportForm(false);
    console.log('Report submitted successfully!');
  };

  return (
    <div style={{
      maxWidth: '80vw',
      margin: '0 auto',
      padding: '20px'
    }}>
      {userProfile && (
        <div>
          <h1 style={{
            fontSize: '24px',
            marginBottom: '10px'
          }}>{userProfile.name}'s Profile</h1>
          <div style={{ marginBottom: '20px' }}>
            <p>Email: {userProfile.email}</p>
            <p>Location: {userProfile.location}</p>
            <p>Address: {userProfile.address}</p>
            <p>Phone Number: {userProfile.phoneNumber}</p>
            <p>Roll Number: {userProfile.rollNumber}</p>
          </div>
          <button style={{
            backgroundColor: '#ff6b6b',
            color: '#fff',
            border: 'none',
            padding: '8px 16px',
            cursor: 'pointer',
            marginBottom: '20px'
          }} onClick={handleReportUser}>Report the User</button>
          {showReportForm && (
            <div style={{
              backgroundColor: '#f0f0f0',
              padding: '20px',
              marginBottom: '20px'
            }}>
              <h2>Report User</h2>
              <form onSubmit={handleReportSubmit}>
                <label>Reason for reporting:</label>
                <input 
                  type="text"
                  value={reportReason}
                  onChange={(e) => setReportReason(e.target.value)}
                  required
                  style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
                />
                <button type="submit" style={{
                  backgroundColor: '#ff6b6b',
                  color: '#fff',
                  border: 'none',
                  padding: '8px 16px',
                  cursor: 'pointer'
                }}>Submit Report</button>
              </form>
            </div>
          )}
          <h2 style={{
            fontSize: '20px',
            marginBottom: '10px'
          }} className="section-heading">User's Items:</h2>
          <div style={{
            display: 'flex',
            flexWrap: 'wrap', // Allow items to wrap
            gap: '20px', // Set gap between items
            marginLeft: 'auto',
            overflowX: 'auto', // Allow horizontal scrolling
          }} className="card-container">
            {isLoading ? (
              <div>Loading...</div>
            ) : userItems.length === 0 ? (
              <div>No items found.</div>
            ) : (
              userItems.map((item, index) => (
                <div key={index}>
                  {item.type === 'itemsToSell' ? (
                    <BuyCard
                      className="card"
                      itemName={item.productTitle}
                      itemPrice={item.productPrice}
                      contactNumber={item.contactNumber}
                      category={item.category}
                      image={item.imageURL}
                    />
                  ) : (
                    <RequestedCard
                      className="card"
                      itemName={item.productTitle}
                      itemPrice={item.productPrice}
                      contactNumber={item.contactNumber}
                      category={item.category}
                    />
                  )}
                </div>
              ))
            )}
          </div>
          <h2 style={{
            fontSize: '20px',
            marginBottom: '10px'
          }} className="section-heading">Reviews:</h2>
          <ul style={{ listStyleType: 'none', padding: '0' }} className="review-list">
            {reviews.map((review, index) => (
              <li key={index}>{review}</li>
            ))}
          </ul>
          <form onSubmit={handleReviewSubmit} style={{ marginTop: '20px', width: '50vw' }} className="review-form">
            <input 
              type="text"
              value={newReview}
              onChange={e => setNewReview(e.target.value)}
              placeholder="Write a review..."
              required
              style={{ width: 'calc(100% - 100px)', padding: '8px', marginRight: '10px' }}
            />
            <button type="submit" disabled={!canSubmitReview} style={{
              backgroundColor: '#4CAF50',
              color: 'white',
              padding: '8px 16px',
              border: 'none',
              cursor: 'pointer'
            }}>Submit Review</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
