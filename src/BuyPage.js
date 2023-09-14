
import BuyCard from './BuyCard';
import React, { useState } from 'react';


// const items = [
//   {
//     itemName: 'Sample Item 1',
//     itemPrice: '$100',
//     contactNumber: '123-456-7890',
//   },
//   {
//     itemName: 'Sample Item 2',
//     itemPrice: '$200',
//     contactNumber: '987-654-3210',
//   },
//   // Add more items here
// ];

function BuyPage({ submissions }) {
  const [showOverlay, setShowOverlay] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  return (
    <div className="page-container">
      <h2 className='page-heading'>Welcome to the Buy Page</h2>
      <div className="card-container">
        {submissions.map((item, index) => (
          !showOverlay && (
            <div
              key={index}
              onClick={() => {
                setSelectedItem(item);
                setShowOverlay(!showOverlay);
                console.log("call");
              }}
            >
              <BuyCard
                className="card"
                itemName={item.itemName}
                itemPrice={item.itemPrice}
                contactNumber={item.contactNumber}
              />
            </div>
          )
        ))}
      </div>

      {showOverlay && selectedItem && (
        <div className="overlay">
          <div className="overlay-content">
            <h3>{selectedItem.itemName}</h3>
            <p>Price: {selectedItem.itemPrice}</p>
            <p>Contact: {selectedItem.contactNumber}</p>
            <p>Contact: {selectedItem.contactNumber}</p>
            <p>Email Id: {selectedItem.email}</p>
            <p>Item Details: {selectedItem.itemDetails}</p>
            <button onClick={() => setShowOverlay(false)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default BuyPage;
