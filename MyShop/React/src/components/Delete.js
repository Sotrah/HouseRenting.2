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
                const response = await fetch(`/Item/DeleteConfirmed/${itemId}`, { method: 'POST' });
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
                {/* ... table and other content ... */}
                <tbody>
                    {items.map((item) => (
                        <tr key={item.itemId}>
                            {/* ... other table cells ... */}
                            <td>
                                <Link to={`/update/${item.itemId}`} className="link-color">Update</Link>
                                {' | '}
                                <a href="#" onClick={(e) => { e.preventDefault(); deleteItem(item.itemId); }} className="link-style">Delete</a>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </div>
        </div>
    );
};

export default EditListings;
