import React from 'react';
import { Link } from 'react-router-dom';
import '../../../wwwroot/lib/bootstrap/css/custom.css';
import '../styles/Layout.css'; // Ensure this import is correct

const Navbar = () => {
    return (
        // Apply the custom-navbar class here
        <nav className="navbar navbar-expand-sm navbar-toggleable-sm navbar-light custom-navbar mb-3">
            <div className="container-fluid">
                <div className="d-flex align-items-center">
                    <Link className="navbar-brand nav-link" to="/">AirDnD</Link>
                <div className="ms-auto"> 
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target=".navbar-collapse" aria-controls="navbarSupportedContent"
                    aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="navbar-collapse collapse d-sm-inline-flex justify-content-between">
                    <ul className="navbar-nav flex-grow-1">
                        <li className="nav-item">
                                    <Link className="nav-link" to="/">Listings</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/EditListings">Edit Listings</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/CustomerUserTable">Users</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/BookingTable">Bookings</Link>
                        </li>
                    </ul>
                    {/* Implement _LoginPartial functionality */}
                </div>
                </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
