import React, { createContext, useRef, useState, useEffect, useContext, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useItems } from '../components/ItemContext';
import Flatpickr from 'flatpickr';

const ItemDisplay = () => {
    const { id } = useParams();
    const [item, setItem] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [itemFields, setItemFields] = useState({
        bookingDate: '',
        itemId: '',
    });

    useEffect(() => {
        const fetchItemDetails = async () => {
            setLoading(true);
            try {
                const response = await fetch(`/Item/GetItem/${id}`);
                if (!response.ok) throw new Error('Failed to fetch item.');
                const data = await response.json();
                setItem(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchItemDetails();
    }, [id]);

    const flatpickrRef = useRef(null);

    useEffect(() => {
        if (!item || !item.bookings) return;

        const bookings = item.bookings.map(booking => booking.bookingDate.split("T")[0]);
        const dates = bookings.length > 0 ? bookings : ["1999-12-12"];

        import('flatpickr').then(({ default: flatpickr }) => {
            

            flatpickrRef.current = flatpickr("#datePicker", {
                minDate: "today",
                dateFormat: "Y-m-d",
                disable: dates,
                allowInput: false,
                onOpen: function (selectedDates, dateStr, instance) {
                    // Check if altInput is available before setting readOnly
                    if (instance.altInput) {
                        instance.altInput.readOnly = true;
                    }
                },
                onClose: function (selectedDates, dateStr, instance) {
                    // Check if altInput is available before setting readOnly
                    if (instance.altInput) {
                        instance.altInput.readOnly = false;
                        instance.altInput.blur();
                    }
                },
                onChange: function (selectedDates, dateStr, instance) {
                    setItemFields({
                        bookingDate: dateStr,
                        itemId: id,
                    });
                }
            });
        });
    }, [item, itemFields]);


    const navigate = useNavigate();

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setItemFields(prevFields => ({
            ...prevFields,
            [name]: value,
        }));
    };


    const handleSubmit = async (event) => {
        event.preventDefault();

        // Declare formData at the beginning
        const formData = new FormData();

        // Check if at least one image is uploaded and other fields are filled
        if (!itemFields.bookingDate) {
            alert("Please fill in all required fields");
            return;
        }

        // Append non-null fields to formData
        Object.keys(itemFields).forEach(key => {
            if (itemFields[key] !== null) {
                formData.append(key, itemFields[key]);
            }
        });
        try {
            const response = await axios.post('/Booking/createbooking', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });

            if (response.status >= 200 && response.status < 300) {
                setItemFields({
                    BookingDate: '',
                });
                console.log("Navigating to home");
                navigate("/");
            } else {
                alert("Failed to create item. Please try again.");
            }
        } catch (error) {
            console.error('Error:', error);
            alert("An error occurred while creating the item.");
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;
    if (!item) return <div>No item found</div>;
   
    return (
        <div className="listing-border">
            <h3 className="my-2 text">
                {name}
            </h3>

            <div className="row gx-2 justify-content-center">
                {!hasSecondImage && !hasThirdImage && (
                    <div className="col-md-12 justify-content-center text image-container">
                        <img alt={name} src={imageUrl} className="img-fluid single-image" />
                    </div>
                )}

                {hasSecondImage && !hasThirdImage && (
                    <div className="col-md-12 text image-container two-images">
                        <img alt={name} src={imageUrl} className="img-fluid" />
                        <img alt={name} src={imageUrl2} className="img-fluid" />
                    </div>
                )}

                {hasThirdImage && (
                    <div className="col-md-12 d-flex image-container">
                        <div className="main-image-wrapper">
                            <img alt={name} src={imageUrl} className="img-fluid main-image" />
                        </div>

                        <div className="additional-images-wrapper">
                            {hasSecondImage && (
                                <img alt={name} src={imageUrl2} className="img-fluid additional-image" />
                            )}
                            {hasThirdImage && (
                                <img alt={name} src={imageUrl3} className="img-fluid additional-image" />
                            )}
                        </div>
                    </div>
                )}
                <div className="col-12 text-center text my-4">
                    <p>{description}</p>
                </div>

                <div className="row box-row">
                    <div className="col left-text text details">
                        <p>
                            Guests: {guests} <br />
                            Bedrooms: {rooms}<br />
                            Beds: {beds}<br />
                            Baths: {baths} <br /><br />
                            Phone number: {phone} <br />
                            Address: {address}<br />
                            Email: {customerUserEmail}
                        </p>
                    </div>
                   
                    <div className="col d-flex justify-content-end text">
                        <div className="border p-4 box">
                            <h3>{price.toFixed(0)} NOK per night</h3>
                            
                            <form onSubmit={handleSubmit}>
                                <div className="form-group text">
                                    <p>
                                        <input type="text" name="bookingDate" value={itemFields.bookingDate}
                                            onChange={handleInputChange} placeholder="Select Date.." id="datePicker" autoComplete="off" required />
                                    </p>
                                </div>
                                <div className="form-group">
                                    <input type="hidden" name="itemId" value={id} />
                                </div>
                                <button type="submit" className="btn btn-primary">Book Stay</button>
                            </form>
                            
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default ItemDisplay;