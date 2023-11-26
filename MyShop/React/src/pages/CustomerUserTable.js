import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';


const CustomerUserPage = () => {
    const [customerUser, setCustomerUsers] = useState([]);
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
            <table className='table table-text' style={{ maxWidth: '1200px' }}>
                <thead>
                    <tr className="table-header">
                        <th> Email </th>
                        <th> Listings </th>
                        <th> Bookings </th>
                    </tr>
                </thead>
                </table>
            </div>
            {customerUser.map((customerUser) => {
                return (
                    <div key={customerUser.email} >
                        <div className="container">
                            <div>
                                <table className='table table-striped table-text' style={{ maxWidth: '1200px' }}>
                                    <tbody>
                                        <tr>
                                            <td>{customerUser.email} </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                );
            })}
        </div>
    );
};

export default CustomerUserPage;
