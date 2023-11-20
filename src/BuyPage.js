import React, { useState, useEffect } from 'react';
import BuyCard from './BuyCard';
import { firestore } from './firebaseConfig';
import Navbar from './Navbar';

function BuyPage() {
  const [showOverlay, setShowOverlay] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [items, setItems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    // Reference to the "itemsToSell" collection
    const itemsCollection = firestore.collection('itemsToSell');

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
  console.log(items)

  const filterItemsByCategory = (category) => {
    setSelectedCategory(category);
  };

  const clearFilter = () => {
    setSelectedCategory(null);
  };

  const filteredItems = selectedCategory
    ? items.filter((item) => item.category === selectedCategory)
    : items;

  return (
    <div className="page-container">
    <Navbar />
    <div className='page-content'>
      <h2 className="page-heading">Welcome to the Buy Page</h2>
      <div className="category-buttons">
        <button onClick={() => filterItemsByCategory('Furniture')}>Furniture</button>
        <button onClick={() => filterItemsByCategory('Electronics')}>Electronics</button>
        <button onClick={() => filterItemsByCategory('Stationery')}>Stationery</button>
        <button onClick={() => filterItemsByCategory('Others')}>Others</button>
        <button onClick={clearFilter}>Clear Filter</button>
      </div>
      <div className="card-container">
        {filteredItems.map((item, index) => (
          !showOverlay && (
            <div
              key={index}
              onClick={() => {
                setSelectedItem(item);
                setShowOverlay(true);
              }}
            >
              <BuyCard
                className="card"
                itemName={item.productTitle}
                itemPrice={item.productPrice}
                contactNumber={item.contactNumber}
                category={item.category}
                image={item.imageURL}
              />
            </div>
          )
        ))}
      </div>
    </div>

      {showOverlay && selectedItem && (
        <div className="overlay">
          <div className="overlay-content">
            <img src={selectedItem.imageURL} alt={selectedItem.itemName} className="card-img-top" />
            <h3>{selectedItem.productPrice}</h3>
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

export default BuyPage;




// import React, { useState, useEffect } from 'react';
// import BuyCard from './BuyCard';
// import { firestore } from './firebaseConfig';


// function BuyPage() {
//   const [showOverlay, setShowOverlay] = useState(false);
//   const [selectedItem, setSelectedItem] = useState(null);
//   const [items, setItems] = useState([]);

//   useEffect(() => {
//     // Create a Firestore reference

//     // Reference to the "itemsToSell" collection
//     const itemsCollection = firestore.collection('itemsToSell');

//     // Fetch data from Firestore
//     itemsCollection.onSnapshot((snapshot) => {
//       const itemsData = [];
//       snapshot.forEach((doc) => {
//         const data = doc.data();
//         itemsData.push(data);
//       });
//       setItems(itemsData);
//     });
//   }, []);

//   return (
//     <div className="page-container">
//       <h2 className="page-heading">Welcome to the Buy Page</h2>
//       <div className="card-container">
//         {items.map((item, index) => (
//           !showOverlay && (
//             <div
//               key={index}
//               onClick={() => {
//                 setSelectedItem(item);
//                 setShowOverlay(true);
//               }}
//             >
//               <BuyCard
//                 className="card"
//                 itemName={item.productTitle}
//                 itemPrice={item.productPrice}
//                 contactNumber={item.contactNumber}
//                 category={item.category}
//               />
//             </div>
//           )
//         ))}
//       </div>

//       {showOverlay && selectedItem && (
//         <div className="overlay">
//           <div className="overlay-content">
//             <h3>{selectedItem.productPrice}</h3>
//             <p>Price: {selectedItem.productPrice}</p>
//             <p>Contact: {selectedItem.contactNumber}</p>
//             <p>Email Id: {selectedItem.emailAddress}</p>
//             <p>Item Details: {selectedItem.itemDetails}</p>
//             <button onClick={() => setShowOverlay(false)}>Close</button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default BuyPage;








// // import BuyCard from './BuyCard';
// // import React, { useState } from 'react';

// // function BuyPage({ submissions }) {
// //   const [showOverlay, setShowOverlay] = useState(false);
// //   const [selectedItem, setSelectedItem] = useState(null);
// //   return (
// //     <div className="page-container">
// //       <h2 className='page-heading'>Welcome to the Buy Page</h2>
// //       <div className="card-container">
// //         {submissions.map((item, index) => (
// //           !showOverlay && (
// //             <div
// //               key={index}
// //               onClick={() => {
// //                 setSelectedItem(item);
// //                 setShowOverlay(!showOverlay);
// //                 console.log("call");
// //               }}
// //             >
// //               <BuyCard
// //                 className="card"
// //                 itemName={item.itemName}
// //                 itemPrice={item.itemPrice}
// //                 contactNumber={item.contactNumber}
// //               />
// //             </div>
// //           )
// //         ))}
// //       </div>

// //       {showOverlay && selectedItem && (
// //         <div className="overlay">
// //           <div className="overlay-content">
// //             <h3>{selectedItem.itemName}</h3>
// //             <p>Price: {selectedItem.itemPrice}</p>
// //             <p>Contact: {selectedItem.contactNumber}</p>
// //             <p>Contact: {selectedItem.contactNumber}</p>
// //             <p>Email Id: {selectedItem.email}</p>
// //             <p>Item Details: {selectedItem.itemDetails}</p>
// //             <button onClick={() => setShowOverlay(false)}>Close</button>
// //           </div>
// //         </div>
// //       )}
// //     </div>
// //   );
// // }

// // export default BuyPage;
