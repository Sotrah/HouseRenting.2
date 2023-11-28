import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../../../wwwroot/lib/bootstrap/css/custom.css';
import '../styles/Layout.css'; // Ensure this import is correct

const Navbar = () => {

    const [loggedInUser, setLoggedInUser] = useState([]);
    useEffect(() => {
        fetch('/CustomerUser/GetUser')
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                setLoggedInUser(data);
            })
            .catch((err) => {
                console.log(err.message);
            });
    }, []);

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
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link className="nav-link" to="/Create">Create New Listing</Link>
                        </li>
                                <li className="nav-item">
                                    {loggedInUser && loggedInUser.email && (
                                        <Link className="nav-link">Hello {loggedInUser.email}</Link>
                                    )}
                                </li>
                    </ul>
                </div>
                </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
