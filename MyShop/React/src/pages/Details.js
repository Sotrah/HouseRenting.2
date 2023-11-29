import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const ItemDisplay = () => {
    const { id } = useParams();
    const [item, setItem] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

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

    // Initialize the flatpickr for the date picker
    useEffect(() => {
        if (!item || !item.bookings) return;

        // Process bookings data outside of the dynamic import
        const bookings = item.bookings.map(booking => booking.bookingDate.split("T")[0]);
        const dates = bookings.length > 0 ? bookings : ["1999-12-12"];

        // Dynamic import of flatpickr
        import('flatpickr').then(({ default: flatpickr }) => {
            flatpickr("#datePicker", {
                minDate: "today",
                dateFormat: "Y-m-d",
                disable: dates,
                allowInput: true,
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
                }
            });
        });

    }, [item]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;
    if (!item) return <div>No item found</div>;

    // Extracted from item for easier access (item || is used for when there might be an empty call) 
    const { imageUrl, imageUrl2, imageUrl3, name, description, guests, rooms, beds, baths, phone, address, customerUserEmail, price } = item || {};
    const hasSecondImage = imageUrl2 && imageUrl2.trim() !== '';
    const hasThirdImage = imageUrl3 && imageUrl3.trim() !== '';

   
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
                            
                            <form>
                                <div className="form-group text">
                                    <p>
                                        <input type="text" name="bookingDate" placeholder="Select Date.." id="datePicker" autoComplete="off" required />
                                    </p>
                                </div>
                                <div className="form-group">
                                    <input type="hidden" name="itemId" value={item ? item.itemId : ''} />
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