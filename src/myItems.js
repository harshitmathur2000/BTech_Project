import React, { useState, useEffect } from 'react';
import BuyCard from './BuyCard';
import RequestedCard from './RequestedCard';
import { firestore, auth, firebase } from './firebaseConfig';
import Navbar from './Navbar';

function MyItemsPage() {
  const [userItems, setUserItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const handleSoldClick = async (itemId, category, itemType) => {
    try {
      // Ensure the user is logged in
      const currentUser = auth.currentUser;
      if (!currentUser) {
        console.error('No logged-in user.');
        return;
      }
  
      // Update the user's myItems or myRequestedItems array by removing the sold item
      const userDocRef = firestore.collection('users').doc(currentUser.uid);
      const userDoc = await userDocRef.get();
  
      if (userDoc.exists) {
        const userData = userDoc.data();
        const myItems = userData.myItems || [];
        const myRequestedItems = userData.myRequestedItems || [];
  
        // Check if the itemId exists in the correct array before removing it
        const itemArray = itemType === 'itemsToSell' ? myItems : myRequestedItems;
        if (itemArray.includes(itemId)) {
          await userDocRef.update({
            [itemType === 'itemsToSell' ? 'myItems' : 'myRequestedItems']:
              firebase.firestore.FieldValue.arrayRemove(itemId),
          });
  
          // Delete the item from the "itemsToSell" or "requestedItems" collection
          await firestore.collection(itemType === 'itemsToSell' ? 'itemsToSell' : 'requestedItems').doc(itemId).delete();
  
          // Delete the item from its respective category collection if category is present
          if (category) {
            await firestore.collection(category).doc(itemId).delete();
          }
  
          // Update the state to remove the item from the list
          setUserItems((prevUserItems) => prevUserItems.filter((item) => item.id !== itemId));
        } else {
          console.error('Item not found in the user\'s array.');
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
            const myRequestedItems = userData.myRequestedItems || [];

            const itemsToSellCollection = firestore.collection('itemsToSell');
            const requestedItemsCollection = firestore.collection('requestedItems');

            // Fetch items from itemsToSell collection
            const itemsToSellQuery = myItems.length > 0 ?
              await itemsToSellCollection.where(firebase.firestore.FieldPath.documentId(), 'in', myItems).get() :
              { docs: [] }; // If myItems is empty, set an empty array

            const itemsToSellData = itemsToSellQuery.docs.map((doc) => ({
              id: doc.id,
              type: 'itemsToSell',
              ...doc.data(),
            }));

            // Fetch items from requestedItems collection
            const requestedItemsQuery = myRequestedItems.length > 0 ?
              await requestedItemsCollection.where(firebase.firestore.FieldPath.documentId(), 'in', myRequestedItems).get() :
              { docs: [] }; // If myRequestedItems is empty, set an empty array

            const requestedItemsData = requestedItemsQuery.docs.map((doc) => ({
              id: doc.id,
              type: 'requestedItems',
              ...doc.data(),
            }));

            // Merge items from both collections
            const allUserItemsData = [...itemsToSellData, ...requestedItemsData];

            setUserItems(allUserItemsData);
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
    <div className='page-container'>
      <Navbar />
      <div className="page-content">
      <h2 className="page-heading">My Items</h2>
      <div className="card-container">
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
              <button onClick={() => handleSoldClick(item.id, item.category, item.type)}>Sold</button>
              <div>{item.type === 'itemsToSell' ? 'For Sale' : 'For Rent'}</div>
            </div>
          ))
        )}
      </div>

      </div>
    </div>
  );
}

export default MyItemsPage;
 


// import React, { useState, useEffect } from 'react';
// import BuyCard from './BuyCard';
// import { firestore, auth, firebase } from './firebaseConfig';
// import Navbar from './Navbar';

// function MyItemsPage() {
//   const [userItems, setUserItems] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);

//   const handleSoldClick = async (itemId, category, itemType) => {
//     try {
//       // Ensure the user is logged in
//       const currentUser = auth.currentUser;
//       if (!currentUser) {
//         console.error('No logged-in user.');
//         return;
//       }
  
//       // Update the user's myItems or myRequestedItems array by removing the sold item
//       const userDocRef = firestore.collection('users').doc(currentUser.uid);
//       const userDoc = await userDocRef.get();
  
//       if (userDoc.exists) {
//         const userData = userDoc.data();
//         const myItems = userData.myItems || [];
//         const myRequestedItems = userData.myRequestedItems || [];
  
//         // Check if the itemId exists in the correct array before removing it
//         const itemArray = itemType === 'itemsToSell' ? myItems : myRequestedItems;
//         if (itemArray.includes(itemId)) {
//           await userDocRef.update({
//             [itemType === 'itemsToSell' ? 'myItems' : 'myRequestedItems']:
//               firebase.firestore.FieldValue.arrayRemove(itemId),
//           });
  
//           // Delete the item from the "itemsToSell" or "requestedItems" collection
//           await firestore.collection(itemType === 'itemsToSell' ? 'itemsToSell' : 'requestedItems').doc(itemId).delete();
  
//           // Delete the item from its respective category collection if category is present
//           if (category) {
//             await firestore.collection(category).doc(itemId).delete();
//           }
  
//           // Update the state to remove the item from the list
//           setUserItems((prevUserItems) => prevUserItems.filter((item) => item.id !== itemId));
//         } else {
//           console.error('Item not found in the user\'s array.');
//         }
//       } else {
//         console.error('User document not found.');
//       }
//     } catch (error) {
//       console.error('Error deleting item:', error);
//     }
//   };
  

//   useEffect(() => {
//     const fetchUserItems = async () => {
//       try {
//         const currentUser = auth.currentUser;

//         if (currentUser) {
//           const usersCollection = firestore.collection('users');
//           const userDoc = await usersCollection.doc(currentUser.uid).get();

//           if (userDoc.exists) {
//             const userData = userDoc.data();
//             const myItems = userData.myItems || [];
//             const myRequestedItems = userData.myRequestedItems || [];

//             const itemsToSellCollection = firestore.collection('itemsToSell');
//             const requestedItemsCollection = firestore.collection('requestedItems');

//             // Fetch items from itemsToSell collection
//             const itemsToSellQuery = myItems.length > 0 ?
//               await itemsToSellCollection.where(firebase.firestore.FieldPath.documentId(), 'in', myItems).get() :
//               { docs: [] }; // If myItems is empty, set an empty array

//             const itemsToSellData = itemsToSellQuery.docs.map((doc) => ({
//               id: doc.id,
//               type: 'itemsToSell',
//               ...doc.data(),
//             }));

//             // Fetch items from requestedItems collection
//             const requestedItemsQuery = myRequestedItems.length > 0 ?
//               await requestedItemsCollection.where(firebase.firestore.FieldPath.documentId(), 'in', myRequestedItems).get() :
//               { docs: [] }; // If myRequestedItems is empty, set an empty array

//             const requestedItemsData = requestedItemsQuery.docs.map((doc) => ({
//               id: doc.id,
//               type: 'requestedItems',
//               ...doc.data(),
//             }));

//             // Merge items from both collections
//             const allUserItemsData = [...itemsToSellData, ...requestedItemsData];

//             setUserItems(allUserItemsData);
//             setIsLoading(false);
//           } else {
//             console.error('User document not found.');
//             setIsLoading(false);
//           }
//         } else {
//           console.error('No logged-in user.');
//           setIsLoading(false);
//         }
//       } catch (error) {
//         console.error('Error fetching user items:', error);
//         setIsLoading(false);
//       }
//     };

//     fetchUserItems();
//   }, []);

//   return (
//     <div className="page-container">
//       <Navbar />
//       <h2 className="page-heading">My Items</h2>
//       <div className="card-container">
//         {isLoading ? (
//           <div>Loading...</div>
//         ) : userItems.length === 0 ? (
//           <div>No items found.</div>
//         ) : (
//           userItems.map((item, index) => (
//             <div key={index}>
//               <BuyCard
//                 className="card"
//                 itemName={item.productTitle}
//                 itemPrice={item.productPrice}
//                 contactNumber={item.contactNumber}
//                 category={item.category}
//                 image={item.imageURL}
//               />
//               <button onClick={() => handleSoldClick(item.id, item.category, item.type)}>Sold</button>
//               <div>{item.type === 'itemsToSell' ? 'For Sale' : 'Requested'}</div>
//             </div>
//           ))
//         )}
//       </div>
//     </div>
//   );
// }

// export default MyItemsPage;





// import React, { useState, useEffect } from 'react';
// import BuyCard from './BuyCard';
// import { firestore, auth, firebase } from './firebaseConfig';
// import Navbar from './Navbar';

// function MyItemsPage() {
//   const [userItems, setUserItems] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);

//   const handleSoldClick = async (itemId, category) => {
//     try {
//       // Ensure the user is logged in
//       const currentUser = auth.currentUser;
//       if (!currentUser) {
//         console.error('No logged-in user.');
//         return;
//       }
  
//       // Update the user's myItems array by removing the sold item
//       const userDocRef = firestore.collection('users').doc(currentUser.uid);
//       const userDoc = await userDocRef.get();
  
//       if (userDoc.exists) {
//         const userData = userDoc.data();
//         const myItems = userData.myItems || [];
  
//         // Check if the itemId exists in myItems before removing it
//         if (myItems.includes(itemId)) {
//           await userDocRef.update({
//             myItems: firebase.firestore.FieldValue.arrayRemove(itemId),
//           });
  
//           // Delete the item from the "itemsToSell" collection
//           await firestore.collection('itemsToSell').doc(itemId).delete();
  
//           // Delete the item from its respective category collection
//           await firestore.collection(category).doc(itemId).delete();
  
//           // Update the state to remove the item from the list
//           setUserItems((prevUserItems) => prevUserItems.filter((item) => item.id !== itemId));
//         } else {
//           console.error('Item not found in the user\'s myItems array.');
//         }
//       } else {
//         console.error('User document not found.');
//       }
//     } catch (error) {
//       console.error('Error deleting item:', error);
//     }
//   };
  
  

//   useEffect(() => {
//     const fetchUserItems = async () => {
//       try {
//         const currentUser = auth.currentUser;
    
//         if (currentUser) {
//           const usersCollection = firestore.collection('users');
//           const userDoc = await usersCollection.doc(currentUser.uid).get();
    
//           if (userDoc.exists) {
//             const userData = userDoc.data();
//             const myItems = userData.myItems || [];
    
//             const itemsCollection = firestore.collection('itemsToSell');
    
//             // Fetch the items with their document IDs
//             const querySnapshot = await itemsCollection.where(
//               firebase.firestore.FieldPath.documentId(),
//               'in',
//               myItems
//             ).get();
    
//             const userItemsData = querySnapshot.docs.map((doc) => ({
//               id: doc.id, // Store the document ID in userItems
//               ...doc.data(),
//             }));
    
//             setUserItems(userItemsData);
//             setIsLoading(false);
//           } else {
//             console.error('User document not found.');
//             setIsLoading(false);
//           }
//         } else {
//           console.error('No logged-in user.');
//           setIsLoading(false);
//         }
//       } catch (error) {
//         console.error('Error fetching user items:', error);
//         setIsLoading(false);
//       }
//     };
    

//     fetchUserItems();
//   }, []);

//   return (
//     <div className="page-container">
//     <Navbar />
//       <h2 className="page-heading">My Items</h2>
//       <div className="card-container">
//         {isLoading ? (
//           <div>Loading...</div>
//         ) : userItems.length === 0 ? (
//           <div>No items found.</div>
//         ) : (
//           userItems.map((item, index) => (
//             <div key={index}>
//               <BuyCard
//                 className="card"
//                 itemName={item.productTitle}
//                 itemPrice={item.productPrice}
//                 contactNumber={item.contactNumber}
//                 category={item.category}
//                 image={item.imageURL}
//               />
//               <button onClick={() => handleSoldClick(item.id, item.category)  }>Sold</button>
//             </div>
//           ))
//         )}
//       </div>
//     </div>
//   );
// }

// export default MyItemsPage;
