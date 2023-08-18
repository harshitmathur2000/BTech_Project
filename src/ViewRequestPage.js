import React from 'react';
import RequestCard from './RequestCard';
function ViewRequestPage({requests}) {
  return (
    <div className="page-container">
      <h2>Welcome to the Request Page</h2>
      <div className="card-container">
        {requests.map((item, index) => (
          <RequestCard
            key={index}
            itemName={item.itemName}
            requestType={item.requestType}
            contactNumber={item.contactNumber}
          />
        ))}
      </div>
    </div>
  );
}

export default ViewRequestPage;
