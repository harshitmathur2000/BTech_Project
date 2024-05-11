import React, { useState, useEffect } from 'react';
import { firestore,firebase } from './firebaseConfig';

function BuyCard({ itemName, itemPrice, contactNumber, category, image,userId }) {
    const [userName, setUserName] = useState('');
  
    useEffect(() => {
      const fetchUserName = async () => {
        try {
          const docRef = firebase.firestore().collection('users').doc(userId);
          const docSnapshot = await docRef.get();
          if (docSnapshot.exists) {
            const userData = docSnapshot.data();
            setUserName(userData.name);
          } else {
            console.log('No such document!');
          }
        } catch (error) {
          console.error('Error fetching document:', error);
        }
      };
  
      fetchUserName();
    }, [userId]);
    console.log(image);
  return (
    <div className="card">
      <div className="card-body">
        <h3 className="card-title">{itemName}</h3>
        <img src={image} alt={itemName} className="card-img-top" />
        <p className="card-text">Seller: {userName}</p>
        <p className="card-text">Item Price: {itemPrice}</p>
        <p className="card-text">Contact Number: {contactNumber}</p>
        <p className="card-text">Category: {category}</p>
      </div>
    </div>
  );
}

export default BuyCard;
