import './App.css';
import React from 'react';

import buyImage from './img/buy.jpg';
import sellImage from './img/sell-out.png'
import requestImage from './img/requestImage.png';
import viewrequestImage from './img/viewrequest.png';
import { Link } from 'react-router-dom';

function HomePage(props) {
  
    return (
        <div className="container ">

            <div className="header">
                <h1 className="header-text" >Collegiate Exchange Hub</h1>
            </div>
            <div className="button-container">
                <div className="button-divs">
                    <Link to="/myItems" className="button button-with-image">

                        <img src={buyImage} alt="Buy" className="button-image" />
                        myItems

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

                        <img src={sellImage} alt="sell" className="button-image" />
                        Sell

                    </Link>
                </div>
                <div className="button-divs">
                    <Link to="/request" className="button button-with-image">

                        <img src={requestImage} alt="request" className="button-image" />
                        Rent

                    </Link>
                </div>
                <div className="button-divs">
                    <Link to="/view-request" className="button button-with-image">

                        <img src={viewrequestImage} alt="viewRequest" className="button-image" />
                        View Rented Items

                    </Link>
                </div>
            </div>
            <div>
            </div>
        </div>
    );
}

export default HomePage;








