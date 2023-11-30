import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const EditListings = () => {
    const [items, setItems] = useState([]);

    useEffect(() => {
        fetchItems();
    }, []);

    const fetchItems = async () => {
        try {
            const response = await fetch('/Item/GetData');
            const data = await response.json();
            setItems(data);
        } catch (err) {
            console.log(err.message);
        }
    };

    const deleteItem = async (itemId) => {
        if (window.confirm('Are you sure you want to delete this item?')) {
            try {
                const response = await fetch(`/api/Item/${itemId}`, { method: 'DELETE' });
                if (!response.ok) {
                    throw new Error('Item deletion failed');
                }
                fetchItems(); // Re-fetch items to update the list
            } catch (err) {
                console.error(err.message);
            }
        }
    };


    return (
        <div>
            <h1>Edit Listings</h1>
            <div className="container">
                <table className='table table-striped table-text' style={{ maxWidth: '1200px' }}>
                    <thead>
                        <tr className="table-header">
                            <th> Id </th>
                            <th> Name </th>
                            <th> Price per night </th>
                            <th> Address </th>
                            <th> Phone number </th>
                            <th> Rooms </th>
                            <th> Beds </th>
                            <th> CustomerUser </th>
                            <th> Actions </th>
                        </tr>
                    </thead>
                    <tbody>
                        {items.map((item) => (
                            <tr key={item.itemId}>
                                <td>{item.itemId}</td>
                                <td>{item.name}</td>
                                <td>{item.price}</td>
                                <td>{item.address}</td>
                                <td>{item.phone}</td>
                                <td>{item.rooms}</td>
                                <td>{item.beds}</td>
                                <td>{item.customerUser.email}</td>
                                <td>
                                    <Link to={`/update/${item.itemId}`} className="link-color">Update</Link>
                                    {' '}
                                    <button onClick={() => deleteItem(item.itemId)} className="link-color">Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <Link to="/create" className="btn btn-primary text-light" >Create New Listing</Link>
            </div>
        </div>
    );
};

export default EditListings;
