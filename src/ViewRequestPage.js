import React, { useState, useEffect } from 'react';
import RequestCard from './RequestCard';
// import firebase from 'firebase/app'; // Import Firebase
// import 'firebase/firestore'; // Import Firestore
import { firestore } from './firebaseConfig';
// import './BuyPage.css'; // You can create a BuyPage.css file for styling if needed.

function ViewRequestPage() {
  const [showOverlay, setShowOverlay] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [items, setItems] = useState([]);

  useEffect(() => {
    // Create a Firestore reference

    // Reference to the "itemsToSell" collection
    const itemsCollection = firestore.collection('requestedItems');

    // Fetch data from Firestore
    itemsCollection.onSnapshot((snapshot) => {
      const itemsData = [];
      snapshot.forEach((doc) => {
        const data = doc.data();
        itemsData.push(data);
      });
      setItems(itemsData);
    });
  }, []);

  return (
    <div className="page-container">
      <h2 className="page-heading">Welcome to the Request Page</h2>
      <div className="card-container">
        {items.map((item, index) => (
          !showOverlay && (
            <div
              key={index}
              onClick={() => {
                setSelectedItem(item);
                setShowOverlay(true);
              }}
            >
              <RequestCard
                className="card"
                itemName={item.productTitle}
                itemPrice={item.productPrice}
                contactNumber={item.contactNumber}
              />
            </div>
          )
        ))}
      </div>

      {showOverlay && selectedItem && (
        <div className="overlay">
          <div className="overlay-content">
            <h3>{selectedItem.productTitle}</h3>
            <p>Price: {selectedItem.productPrice}</p>
            <p>Contact: {selectedItem.contactNumber}</p>
            <p>Email Id: {selectedItem.emailAddress}</p>
            <p>Item Details: {selectedItem.itemDetails}</p>
            <button onClick={() => setShowOverlay(false)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ViewRequestPage;






// import React, { useState } from 'react';
// import RequestCard from './RequestCard';
// function ViewRequestPage({ requests }) {
//   const [showOverlay, setShowOverlay] = useState(false);
//   const [selectedItem, setSelectedItem] = useState(null);
//   return (
//     <div className="page-container">
//       <h2 className='page-heading'>Welcome to the Request Page</h2>
//       <div className="card-container">
//         {requests.map((item, index) => (
//           !showOverlay && (
//             <div
//               key={index}
//               onClick={() => {
//                 setSelectedItem(item);
//                 setShowOverlay(!showOverlay);
//                 console.log("call");
//               }}
//             >
//               <RequestCard className="card"
//                 itemName={item.itemName}
//                 requestType={item.requestType}
//                 contactNumber={item.contactNumber}>

//               </RequestCard>
//             </div>
//           )
//         ))}

//       </div>
//       {showOverlay && selectedItem && (
//         <div className="overlay">
//           <div className="overlay-content">
//             <h3>{selectedItem.itemName}</h3>
//             <p>Request type: {selectedItem.requestType}</p>
//             <p>Contact: {selectedItem.contactNumber}</p>
//             <p>Email Id: {selectedItem.email}</p>
//             <button onClick={() => setShowOverlay(false)}>Close</button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default ViewRequestPage;
