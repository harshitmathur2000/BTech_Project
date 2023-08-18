import React from 'react';

function RequestCard({ itemName, requestType, contactNumber }) {
  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">{itemName}</h5>
        <p className="card-text">Request type: {requestType}</p>
        <p className="card-text">Contact Number: {contactNumber}</p>
      </div>
    </div>
  );
}

export default RequestCard;