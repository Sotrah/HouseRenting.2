import React, { Component, useState, useEffect } from 'react';

const CustomerUserList = () => {
    const [customerUsers, setCustomerUsers] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('/api/CustomerUser');
                const data = await response.json();
                setCustomerUsers(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div>
            <h2>Customer Users List</h2>
            <table>
                <thead>
                    <tr>
                        <th>Email</th>
                        <th>BookingId</th>
                        {/* Add more columns as needed */}
                    </tr>
                </thead>
                <tbody>
                    {customerUsers.map(user => (
                        <tr key={user.Email}>
                            <td>{user.Email}</td>
                            <td>{user.BookingId}</td>
                            {/* Add more cells based on your CustomerUser model */}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export class Counter extends React.Component {
    static displayName = Counter.name;

    render() {
        return (
            <div>
                <CustomerUserList />
            </div>
        );
    }
}
