import React, { useState } from 'react';
import './SellPage.css';
import { firebase, firestore, auth, storage } from './firebaseConfig'; // Update the imports
import {
  ref,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";

function SellPage() {
  const [itemTitle, setItemTitle] = useState('');
  const [itemPrice, setItemPrice] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [email, setEmail] = useState('');
  const [itemDetails, setItemDetails] = useState('');
  const [category, setCategory] = useState('Furniture'); // Set a default value
  const [image, setImage] = useState(null); // Store the selected image file
  const [isUploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);

  console.log(storage)

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  const handleUpload = () => {
    if (image) {
      const storageRef = ref(storage, `images/${image.name}`);
      uploadBytes(storageRef, image).then((snapshot) => {
        getDownloadURL(snapshot.ref).then((url) => {
          setImage(url);
        });
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if there's a logged-in user
    const user = auth.currentUser;
    if (!user) {
      console.error('User is not logged in');
      return;
    }

    try {
      // Handle the image upload
      handleUpload();

      // Add a new document with the form data to the "itemsToSell" collection
      const customItemId = `${user.uid}_${Date.now()}`;
      const newItemRef = firestore.collection('itemsToSell').doc(customItemId);
      await newItemRef.set({
        productTitle: itemTitle,
        productPrice: itemPrice,
        contactNumber: contactNumber,
        emailAddress: email,
        itemDetails: itemDetails,
        category: category, // Include the selected category
        userId: user.uid,
        imageURL: image, // You can add imageURL here
      });

      // Update the user's document in the "users" collection
      await firestore.collection('users').doc(user.uid).update({
        myItems: firebase.firestore.FieldValue.arrayUnion(customItemId),
      });

      // Add the same item to the category-specific collection using the custom item ID
      await firestore.collection(category).doc(customItemId).set({
        itemId: customItemId,
      });

      // Clear the form fields and reset the image state after successful submission
      setItemTitle('');
      setItemPrice('');
      setContactNumber('');
      setEmail('');
      setItemDetails('');
      setCategory('Furniture'); // Reset the category to the default value
      setImage(null);
      setProgress(0);

      console.log('Form submitted successfully!');
    } catch (error) {
      console.error('Error submitting form:', error);
    }
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
          <label>
            Category:
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="Furniture">Furniture</option>
              <option value="Electronics">Electronics</option>
              <option value="Stationery">Stationery</option>
              <option value="Others">Others</option>
            </select>
          </label>
          <label>
            Item Image:
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
            />
          </label>
          {isUploading && <p>Uploading... {progress}%</p>}
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
}

export default SellPage;




// import React, { useState } from 'react';
// import './SellPage.css';
// import { firestore, auth, firebase } from './firebaseConfig';

// function SellPage() {
//   const [itemTitle, setItemTitle] = useState('');
//   const [itemPrice, setItemPrice] = useState('');
//   const [contactNumber, setContactNumber] = useState('');
//   const [email, setEmail] = useState('');
//   const [itemDetails, setItemDetails] = useState('');
//   const [category, setCategory] = useState('Furniture'); // Set a default value

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // Check if there's a logged-in user
//     const user = auth.currentUser;
//     if (!user) {
//       console.error('User is not logged in');
//       return;
//     }

    

//     try {
//       // Add a new document with the form data to the "itemsToSell" collection
//       const customItemId = `${user.uid}_${Date.now()}`;
//       const newItemRef = firestore.collection('itemsToSell').doc(customItemId);
//       await newItemRef.set({
//         productTitle: itemTitle,
//         productPrice: itemPrice,
//         contactNumber: contactNumber,
//         emailAddress: email,
//         itemDetails: itemDetails,
//         category: category, // Include the selected category
//         userId: user.uid,
//       });

//       // Update the user's document in the "users" collection
//       await firestore.collection('users').doc(user.uid).update({
//         myItems: firebase.firestore.FieldValue.arrayUnion(customItemId),
//       });
  
//       // Add the same item to the category-specific collection using the custom item ID
//       await firestore.collection(category).doc(customItemId).set({
//         itemId: customItemId,
//       });

//       // Clear the form fields after successful submission
//       setItemTitle('');
//       setItemPrice('');
//       setContactNumber('');
//       setEmail('');
//       setItemDetails('');
//       setCategory('Furniture'); // Reset the category to the default value


//       console.log('Form submitted successfully!');
//     } catch (error) {
//       console.error('Error submitting form:', error);
//     }
//   };

//   return (
//     <div className="page-container">
//       <h2>Welcome to the Sell Page</h2>
//       <div className="form-container">
//         <h3>Sell Your Item</h3>
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
//             Item Price:
//             <input
//               type="text"
//               value={itemPrice}
//               onChange={(e) => setItemPrice(e.target.value)}
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
//           <label>
//             Item Details:
//             <textarea
//               value={itemDetails}
//               onChange={(e) => setItemDetails(e.target.value)}
//               required
//             />
//           </label>
//           <label>
//             Category:
//             <select
//               value={category}
//               onChange={(e) => setCategory(e.target.value)}
//             >
//               <option value="Furniture">Furniture</option>
//               <option value="Electronics">Electronics</option>
//               <option value="Stationery">Stationery</option>
//               <option value="Others">Others</option>
//             </select>
//           </label>
//           <button type="submit">Submit</button>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default SellPage;





// import React, { useState } from 'react';
// import './SellPage.css';
// import { firestore, auth, firebase } from './firebaseConfig';

// function SellPage() {
//   const [itemTitle, setItemTitle] = useState('');
//   const [itemPrice, setItemPrice] = useState('');
//   const [contactNumber, setContactNumber] = useState('');
//   const [email, setEmail] = useState('');
//   const [itemDetails, setItemDetails] = useState('');

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // Check if there's a logged-in user
//     const user = auth.currentUser;
//     if (!user) {
//       console.error('User is not logged in');
//       return;
//     }

//     try {
//       // Add a new document with the form data to the "itemsToSell" collection
//       const newItemRef = await firestore.collection('itemsToSell').add({
//         productTitle : itemTitle,
//         productPrice: itemPrice,
//         contactNumber: contactNumber,
//         emailAddress: email,
//         itemDetails: itemDetails,
//         userId: user.uid,

//       });

//       // Get the generated document ID
//       const newItemId = newItemRef.id;

//       // Update the user's document in the "users" collection
//       console.log(user.uid)
//       console.log(newItemRef.id)
//       await firestore.collection('users').doc(user.uid).update({
//         myItems: firebase.firestore.FieldValue.arrayUnion(newItemId), // Add the document ID to the "myItems" array
//       });

//       // Clear the form fields after successful submission
//       setItemTitle('')
//       setItemPrice('');
//       setContactNumber('');
//       setEmail('');
//       setItemDetails('');

//       console.log('Form submitted successfully!');
//     } catch (error) {
//       console.error('Error submitting form:', error);
//     }
//   };


//   return (
//     <div className="page-container">
//       <h2>Welcome to the Sell Page</h2>
//       <div className="form-container">
//         <h3>Sell Your Item</h3>
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
//             Item Price:
//             <input
//               type="text"
//               value={itemPrice}
//               onChange={(e) => setItemPrice(e.target.value)}
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
//           <label>
//             Item Details:
//             <textarea
//               value={itemDetails}
//               onChange={(e) => setItemDetails(e.target.value)}
//               required
//             />
//           </label>
//           <button type="submit">Submit</button>
//         </form>
//       </div>
//     </div>
//   );
// }
// export default SellPage;









