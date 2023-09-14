import React, { useState } from 'react';
import RequestCard from './RequestCard';
function ViewRequestPage({ requests }) {
  const [showOverlay, setShowOverlay] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  return (
    <div className="page-container">
      <h2 className='page-heading'>Welcome to the Request Page</h2>
      <div className="card-container">
        {requests.map((item, index) => (
          !showOverlay && (
            <div
              key={index}
              onClick={() => {
                setSelectedItem(item);
                setShowOverlay(!showOverlay);
                console.log("call");
              }}
            >
              <RequestCard className="card"
                itemName={item.itemName}
                requestType={item.requestType}
                contactNumber={item.contactNumber}>

              </RequestCard>
            </div>
          )
        ))}

      </div>
      {showOverlay && selectedItem && (
        <div className="overlay">
          <div className="overlay-content">
            <h3>{selectedItem.itemName}</h3>
            <p>Request type: {selectedItem.requestType}</p>
            <p>Contact: {selectedItem.contactNumber}</p>
            <p>Email Id: {selectedItem.email}</p>
            <button onClick={() => setShowOverlay(false)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ViewRequestPage;
