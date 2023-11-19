import React from 'react';

function RequestedCard({ itemName, itemPrice, contactNumber, category }) {
  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">{itemName}</h5>
        <p className="card-text">Item Price: {itemPrice}</p>
        <p className="card-text">Contact Number: {contactNumber}</p>
        <p className="card-text">Category: {category}</p>
      </div>
    </div>
  );
}

export default RequestedCard;
