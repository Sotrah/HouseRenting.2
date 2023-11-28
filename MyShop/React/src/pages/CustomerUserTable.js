import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const CustomerUserPage = () => {
    const [customerUsers, setCustomerUsers] = useState([]);

    useEffect(() => {
        fetch('/CustomerUser/GetData')
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                setCustomerUsers(data);
            })
            .catch((err) => {
                console.log(err.message);
            });
    }, []);

    return (
        <div>
            <h1>Users</h1>
            <div className="container">
                <table className='table table-striped table-text' style={{ maxWidth: '1200px' }}>
                    <thead>
                        <tr className="table-header">
                            <th> Email </th>
                            <th> Listings </th>
                            <th> Bookings </th>
                        </tr>
                    </thead>
                    <tbody>
                        {customerUsers.map((user) => (
                            <tr key={user.email}>
                                <td>{user.email}</td>
                                <td>
                                    {user.items?.map((item, index) => (
                                        <div key={index}>
                                            <Link to={`/item/${item.itemId}`} className="link-color">{item.name}</Link>
                                        </div>
                                    ))}
                                </td>
                                <td>
                                    {user.bookings?.map((booking, index) => (
                                        <div key={index}>
                                            Booking ID: {booking.bookingId}, {new Date(booking.bookingDate).toLocaleDateString('en-GB')}
                                        </div>
                                    ))}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default CustomerUserPage;

