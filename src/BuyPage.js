import React from 'react';
import BuyCard from './BuyCard';

const items = [
  {
    itemName: 'Sample Item 1',
    itemPrice: '$100',
    contactNumber: '123-456-7890',
  },
  {
    itemName: 'Sample Item 2',
    itemPrice: '$200',
    contactNumber: '987-654-3210',
  },
  // Add more items here
];

function BuyPage() {
  return (
    <div className="page-container">
      <h2>Welcome to the Buy Page</h2>
      <div className="card-container">
        {items.map((item, index) => (
          <BuyCard
            key={index}
            itemName={item.itemName}
            itemPrice={item.itemPrice}
            contactNumber={item.contactNumber}
          />
        ))}
      </div>
    </div>
  );
}

export default BuyPage;
