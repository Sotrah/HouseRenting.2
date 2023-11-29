import React, { createContext, useState, useEffect, useContext, useCallback } from 'react';

const ItemsContext = createContext();

export const useItems = () => useContext(ItemsContext);

export const ItemsProvider = ({ children }) => {
    const [items, setItems] = useState([]);

    const fetchItems = useCallback(async () => {
        try {
            const response = await fetch('/Item/GetData');
            if (response.ok) {
                const data = await response.json();
                setItems(data);
            } else {
                console.error('Failed to fetch items');
            }
        } catch (error) {
            console.error('Error fetching items:', error);
        }
    }, []);

    useEffect(() => {
        fetchItems();
    }, []);

    return (
        <ItemsContext.Provider value={{ items, fetchItems }}>
            {children}
        </ItemsContext.Provider>
    );
};
