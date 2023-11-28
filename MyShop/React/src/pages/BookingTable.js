import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

/* experimentelt*/
const BookingPage = () => {
    const [bookings, setBookings] = useState([]);
    useEffect(() => {
        fetch('/Booking/GetData')
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                setBookings(data);
            })
            .catch((err) => {
                console.log(err.message);
            });
    }, []);

    return (
        <div>
            <h1>Bookings</h1>
            {bookings.map((booking) => {
                return (
                    <div key={booking.bookingId} style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '20px' }}>
                        <div className="container">
                            <h5>Booking {booking.bookingId} </h5>
                            <div>
                                <table className='table table-striped table-text' style={{ maxWidth: '1200px' }}>
                                    <thead>
                                        <tr className="table-header">
                                            <th> CustomerUser </th>
                                            <th> Listing </th>
                                            <th> BookingDate </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>{booking.customerUser.email} </td>
                                            <td>
                                                <Link to={`/item/${booking.itemId}`} className="link-color">
                                                {booking.item.name}
                                                </Link>
                                            </td>
                                            <td>{new Date(booking.bookingDate).toLocaleDateString('en-GB')}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                );
            })}
        </div>
    );
};

export default BookingPage;
