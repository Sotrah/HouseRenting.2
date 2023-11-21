import React, { useState, useEffect } from 'react';
import ItemCard from './components/ItemCard'; // Adjust the path as necessary
import Layout from './components/Layout';
import HomePage from './components/HomePage';

const App = () => {
    const [items, setItems] = useState([]);

    useEffect(() => {
        // Fetch items from the API
        fetch('/CustomerUser/GetData') // Adjust the URL to your API endpoint
            .then(response => response.json())
            .then(data => {
                console.log(data);
                setItems(data);
            })
            .catch(err => console.log(err));
    }, []);

    return (
        <Layout>
        <HomePage />
        </Layout>
    );
};

export default App;
