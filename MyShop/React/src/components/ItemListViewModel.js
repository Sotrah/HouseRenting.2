import React, { useState, useEffect } from 'react';
import ItemCard from './ItemCard';

const ItemListView = () => {
    const [items, setItems] = useState([]);

    useEffect(() => {
        fetch('/Item/GetData')
            .then(response => response.json())
            .then(data => setItems(data))
            .catch(error => console.error('Error fetching items:', error));
    }, []);

    return (
        <div className="container">
            <div className="row">
                {items.map(item => (
                    <ItemCard key={item.itemId} item={item} />
                ))}
            </div>
        </div>
    );
};

export default ItemListView;
