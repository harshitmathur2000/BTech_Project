import React, { useState, useEffect } from 'react';
import BuyCard from './BuyCard';
import { firestore, auth, firebase } from './firebaseConfig';

function MyItemsPage() {
  const [userItems, setUserItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const handleSoldClick = async (itemId, category) => {
    try {
      // Ensure the user is logged in
      const currentUser = auth.currentUser;
      if (!currentUser) {
        console.error('No logged-in user.');
        return;
      }
  
      // Update the user's myItems array by removing the sold item
      const userDocRef = firestore.collection('users').doc(currentUser.uid);
      const userDoc = await userDocRef.get();
  
      if (userDoc.exists) {
        const userData = userDoc.data();
        const myItems = userData.myItems || [];
  
        // Check if the itemId exists in myItems before removing it
        if (myItems.includes(itemId)) {
          await userDocRef.update({
            myItems: firebase.firestore.FieldValue.arrayRemove(itemId),
          });
  
          // Delete the item from the "itemsToSell" collection
          await firestore.collection('itemsToSell').doc(itemId).delete();
  
          // Delete the item from its respective category collection
          await firestore.collection(category).doc(itemId).delete();
  
          // Update the state to remove the item from the list
          setUserItems((prevUserItems) => prevUserItems.filter((item) => item.id !== itemId));
        } else {
          console.error('Item not found in the user\'s myItems array.');
        }
      } else {
        console.error('User document not found.');
      }
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };
  
  

  useEffect(() => {
    const fetchUserItems = async () => {
      try {
        const currentUser = auth.currentUser;
    
        if (currentUser) {
          const usersCollection = firestore.collection('users');
          const userDoc = await usersCollection.doc(currentUser.uid).get();
    
          if (userDoc.exists) {
            const userData = userDoc.data();
            const myItems = userData.myItems || [];
    
            const itemsCollection = firestore.collection('itemsToSell');
    
            // Fetch the items with their document IDs
            const querySnapshot = await itemsCollection.where(
              firebase.firestore.FieldPath.documentId(),
              'in',
              myItems
            ).get();
    
            const userItemsData = querySnapshot.docs.map((doc) => ({
              id: doc.id, // Store the document ID in userItems
              ...doc.data(),
            }));
    
            setUserItems(userItemsData);
            setIsLoading(false);
          } else {
            console.error('User document not found.');
            setIsLoading(false);
          }
        } else {
          console.error('No logged-in user.');
          setIsLoading(false);
        }
      } catch (error) {
        console.error('Error fetching user items:', error);
        setIsLoading(false);
      }
    };
    

    fetchUserItems();
  }, []);

  return (
    <div className="page-container">
      <h2 className="page-heading">My Items</h2>
      <div className="card-container">
        {isLoading ? (
          <div>Loading...</div>
        ) : userItems.length === 0 ? (
          <div>No items found.</div>
        ) : (
          userItems.map((item, index) => (
            <div key={index}>
              <BuyCard
                className="card"
                itemName={item.productTitle}
                itemPrice={item.productPrice}
                contactNumber={item.contactNumber}
                category={item.category}
                image={item.imageURL}
              />
              <button onClick={() => handleSoldClick(item.id, item.category)  }>Sold</button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default MyItemsPage;
