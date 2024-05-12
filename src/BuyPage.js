import React, { useState, useEffect } from 'react';
import BuyCard from './BuyCard';
import { firestore,firebase } from './firebaseConfig';
import Navbar from './Navbar';
function UserProfile({ userId }) {
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const fetchUserName = async () => {
      try {
        const docRef = firebase.firestore().collection('users').doc(userId);
        const docSnapshot = await docRef.get();
        if (docSnapshot.exists) {
          const userData = docSnapshot.data();
          setUserName(userData.name);
        } else {
          console.log('No such document!');
        }
      } catch (error) {
        console.error('Error fetching document:', error);
      }
    };

    fetchUserName();
  }, [userId]);

  return <p>Seller: {userName}</p>;
}

function BuyPage() {
  const [showOverlay, setShowOverlay] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [items, setItems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedBudget, setSelectedBudget] = useState(10000); // For the price filter
  const [searchQuery, setSearchQuery] = useState(''); // Added for the search functionality

  useEffect(() => {
    const itemsCollection = firestore.collection('itemsToSell');
    itemsCollection.onSnapshot((snapshot) => {
      const itemsData = [];
      snapshot.forEach((doc) => {
        const data = doc.data();
        itemsData.push(data);
      });
      setItems(itemsData);
    });
  }, []);

  const filterItemsByCategory = (category) => {
    setSelectedCategory(category);
  };

  const clearFilter = () => {
    setSelectedCategory(null);
    setSelectedBudget(10000); // Resetting budget to max when clearing filters
    setSearchQuery(''); // Resetting search query
  };

  // Update filtering logic to include search functionality
  const filteredItems = items.filter((item) => {
    const categoryMatch = selectedCategory ? item.category === selectedCategory : true;
    const priceMatch = item.productPrice <= selectedBudget;
    const searchMatch = item.productTitle.toLowerCase().includes(searchQuery.toLowerCase()); // Filter by search query
    return categoryMatch && priceMatch && searchMatch;
  });

  return (
    <div className="page-container">
      <Navbar />
      <div className='page-content'>
        <h2 className="page-heading">Welcome to the Buy Page</h2>
        {/* Search Bar */}
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search for items..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="category-buttons">
          {/* Category Filter Buttons */}
          <button onClick={() => filterItemsByCategory('Furniture')}>Furniture</button>
          <button onClick={() => filterItemsByCategory('Electronics')}>Electronics</button>
          <button onClick={() => filterItemsByCategory('Stationery')}>Stationery</button>
          <button onClick={() => filterItemsByCategory('Others')}>Others</button>
          <button onClick={clearFilter}>Clear Filter</button>
        </div>
        {/* Price Filter Slider */}
        <div className="price-filter">
          <label htmlFor="budget">Max Price: {selectedBudget}</label>
          <input
            type="range"
            id="budget"
            min="0"
            max="10000"
            value={selectedBudget}
            onChange={(e) => setSelectedBudget(parseInt(e.target.value, 10))}
          />
        </div>
        <div className="card-container">
          {/* Display filtered items */}
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
                  userId={item.userId}
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
            <a href={`/profile/${selectedItem.userId}`}><UserProfile userId={selectedItem.userId} /></a>
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