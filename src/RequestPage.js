import React, { useState } from 'react';
import './SellPage.css';
import { firestore, auth, firebase} from './firebaseConfig';
import Navbar from './Navbar';

function RequestPage() {
  const [itemTitle, setItemTitle] = useState('');
  const [itemPrice, setItemPrice] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [email, setEmail] = useState('');
  const [itemDetails, setItemDetails] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = auth.currentUser;
    if (!user) {
      console.error('User is not logged in');
      return;
    }

    // Create a Firestore reference

    // Add a new document with the form data to the "itemsToSell" collection
    try {
      const newItemRef = await firestore.collection('requestedItems').add({
        productTitle : itemTitle,
        productPrice: itemPrice,
        contactNumber: contactNumber,
        emailAddress: email,
        itemDetails: itemDetails,
        userId: user.uid,
      });

      const newItemId = newItemRef.id;
      await firestore.collection('users').doc(user.uid).update({
        myRequestedItems: firebase.firestore.FieldValue.arrayUnion(newItemId), // Add the document ID to the "myItems" array
      });

      // Clear the form fields after successful submission
      setItemTitle('');
      setItemPrice('');
      setContactNumber('');
      setEmail('');
      setItemDetails('');
      
      console.log('Form submitted successfully!');
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };


  return (
    <div className="page-container">
    <Navbar />
      <h2>Welcome to the Request Page</h2>
      <div className="form-container">
        <h3>Request For an Item</h3>
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
export default RequestPage;







// import React, { useState } from 'react';
// import './SellPage.css';

// function RequestPage({ setRequests }) {
//   const [itemTitle, setItemTitle] = useState('');
//   const [requestType, setRequestType] = useState('');
//   const [contactNumber, setContactNumber] = useState('');
//   const [email, setEmail] = useState('');
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const newRequest = {
//       itemTitle,
//       requestType,
//       contactNumber,
//       email
//     };
//     setRequests((prevRequests) => [...prevRequests, newRequest]);
//     setItemTitle('');
//     setRequestType('');
//     setContactNumber('');
//     setEmail('');

//   };
//   return (
//     <div className="page-container">
//       <h2>Welcome to the Request Page</h2>
//       <div className="form-container">
//         <h3>Make your Request</h3>
//         <form onSubmit={handleSubmit} className="sell-form">
//           <label>
//             Item Title:
//             <input
//               type="text"
//               value={itemTitle}
//               onChange={(e) => setItemTitle(e.target.value)}
//               required
//             />
//           </label>
//           <label>
//             Request type:
//             <input
//               type="text"
//               value={requestType}
//               onChange={(e) => setRequestType(e.target.value)}
//               required
//             />
//           </label>
//           <label>
//             Contact Number:
//             <input
//               type="tel"
//               value={contactNumber}
//               onChange={(e) => setContactNumber(e.target.value)}
//               required
//             />
//           </label>
//           <label>
//             Email:
//             <input
//               type="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               required
//             />
//           </label>
//           <button type="submit">Submit</button>
//         </form>
//       </div>
//     </div>
//   );

  
// }

// export default RequestPage;
