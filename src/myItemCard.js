import React from 'react';

function myItemCard({ itemName, itemPrice, contactNumber, category, onSoldClick }) {
  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">{itemName}</h5>
        <p className="card-text">Item Price: {itemPrice}</p>
        <p className="card-text">Contact Number: {contactNumber}</p>
        <p className="card-text">Category: {category}</p>
        <button onClick={onSoldClick}>Sold</button>
      </div>
    </div>
  );
}

export default myItemCard;
