import React, { useState, useEffect } from 'react';
import ItemCard from './ItemCard';

const ItemListView = () => {
    const [items, setItems] = useState([]);

    useEffect(() => {
        fetch('/api/Item/GetItems') // Adjust the endpoint as needed
            .then(response => response.json())
            .then(data => setItems(data))
            .catch(error => console.error('Error fetching items:', error));
    }, []);

    return (
        <div>
            {items.map(item => (
                <ItemCard key={item.itemId} item={item} />
            ))}
        </div>
    );
};

export default ItemListView;
