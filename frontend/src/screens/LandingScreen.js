import React from "react";
import { Link } from 'react-router-dom';
import land from "../img/land.jpg"

function LandingScreen() {
    return (
        <div className="land-page-img"style={{ margin: "150px 0px 0px 0px" }} >
            <div className="land-hover">
            <h1>Welcome to our Travel Booking App</h1>
            <h3>Book Your Dream Vacation.Plan your perfect trip with us.</h3>
            <Link to="/home">
                <button>Get Started</button>
            </Link>
            <Link to="/contact">
                <button>Contact</button>
            </Link>
            </div>
        </div>
    )
}
export default LandingScreen;