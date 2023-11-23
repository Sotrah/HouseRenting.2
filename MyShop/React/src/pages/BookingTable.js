import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BookingTable from './BookingTable';

const BookingPage = () => {
    const [bookings, setBookings] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        axios.get('http://localhost:5000/Booking/GetData')
            .then(response => {
                setBookings(response.data);
                setIsLoading(false);
            })
            .catch(error => {
                console.error("Error fetching bookings", error);
                setError('Failed to load bookings.');
                setIsLoading(false);
            });
    }, []);

    if (isLoading) {
        return <div>Loading bookings...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (bookings.length === 0) {
        return <div>No bookings available.</div>;
    }

    return (
        <div className="container">
            <h1>Bookings</h1>
            <BookingTable bookings={bookings} />
        </div>
    );
};

export default BookingPage;
