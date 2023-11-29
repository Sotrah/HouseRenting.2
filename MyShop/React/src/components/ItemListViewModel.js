import React, { useEffect } from 'react';
import { useItems } from '../components/ItemContext'; 
import ItemCard from './ItemCard';

const ItemListView = () => {
    const { items, fetchItems } = useItems();

    useEffect(() => {
        fetchItems(); // Call fetchItems from context
    }, [fetchItems]); // Add fetchItems as a dependency

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
