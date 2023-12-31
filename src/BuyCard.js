import React from 'react';

function BuyCard({ itemName, itemPrice, contactNumber, category, image }) {
  return (
    <div className="card">
      <div className="card-body">
        <img src={image} alt={itemName} className="card-img-top" />
        <h5 className="card-title">{itemName}</h5>
        <p className="card-text">Item Price: {itemPrice}</p>
        <p className="card-text">Contact Number: {contactNumber}</p>
        <p className="card-text">Category: {category}</p>
      </div>
    </div>
  );
}

export default BuyCard;
