// Import necessary dependencies and assets
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { auth } from './firebaseConfig'; // Assuming you have firebaseConfig.js where firebase is initialized
import buyImage from './img/buy.jpg';
import profile from './img/profile.png';
import sellImage from './img/sell-out.png';
import requestImage from './img/requestImage.png';
import viewrequestImage from './img/viewrequest.png';

// Define the HomePage component
function HomePage() {
    // State to store user's display name and user ID
    const [userName, setUserName] = useState("");
    const [userId, setUserId] = useState("");

    // Effect hook to listen for changes in authentication state
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (user) {
                setUserName(user.displayName);
                setUserId(user.uid);
            } else {
                setUserName("");
                setUserId("");
            }
        });

        // Cleanup function to unsubscribe from auth state changes
        return () => unsubscribe();
    }, []);

    // Construct the profile URL based on whether the user is logged in
    const profileUrl = userId ? `/profile/${userId}` : '/login';

    // Render the component
    return (
        <div className="container">
            <div className="header">
                <h1 className="header-text">Collegiate Exchange Hub</h1>
            </div>
            <div className="button-container">
                <div className="button-divs">
                    <Link to={profileUrl} className="button button-with-image">
                        <img src={profile} alt="Buy" className="button-image" />
                        Profile
                    </Link>
                </div>
                <div className="button-divs">
                    <Link to="/buy" className="button button-with-image">
                        <img src={buyImage} alt="Buy" className="button-image" />
                        Buy
                    </Link>
                </div>
                <div className="button-divs">
                    <Link to="/sell" className="button button-with-image">
                        <img src={sellImage} alt="Sell" className="button-image" />
                        Sell
                    </Link>
                </div>
                <div className="button-divs">
                    <Link to="/request" className="button button-with-image">
                        <img src={requestImage} alt="Request" className="button-image" />
                        Rent
                    </Link>
                </div>
                <div className="button-divs">
                    <Link to="/view-request" className="button button-with-image">
                        <img src={viewrequestImage} alt="View Requests" className="button-image" />
                        View Rented Items
                    </Link>
                </div>
            </div>
        </div>
    );
}

// Export the HomePage component
export default HomePage;
