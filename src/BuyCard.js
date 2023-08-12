import React from 'react';

function BuyCard({ itemName, itemPrice, contactNumber }) {
  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">{itemName}</h5>
        <p className="card-text">Item Price: {itemPrice}</p>
        <p className="card-text">Contact Number: {contactNumber}</p>
      </div>
    </div>
  );
}

export default BuyCard;
