import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BookingTable from './BookingTable'; // Anta at dette er en egen komponent

const BookingPage = () => {
    const [bookings, setBookings] = useState([]);

    useEffect(() => {
        // Erstatt med faktisk API-endepunkt
        axios.get('http://localhost:5000/Booking/GetData')
            .then(response => {
                setBookings(response.data);
            })
            .catch(error => {
                console.error("Error fetching bookings", error);
            });
    }, []);

    return (
        <div className="container">
            <h1>Bookings</h1>
            <BookingTable bookings={bookings} />
        </div>
    );
};

export default BookingPage;
