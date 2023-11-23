import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CustomerUserTable from './CustomerUserTable'; // Anta at dette er en egen komponent

const CustomerUserPage = () => {
    const [customerUsers, setCustomerUsers] = useState([]);

    useEffect(() => {
        // Erstatt med faktisk API-endepunkt
        axios.get('http://localhost:7205/CustomerUser/GetData')
            .then(response => {
                setCustomerUsers(response.data);
            })
            .catch(error => {
                console.error("Error fetching customer users", error);
            });
    }, []);

    return (
        <div className="container">
            <h1>Customer Users</h1>
            <CustomerUserTable customerUsers={customerUsers} />
        </div>
    );
};

export default CustomerUserPage;
