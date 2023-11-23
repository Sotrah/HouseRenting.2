import React from 'react';

const ItemDisplay = ({ item }) => {
    const hasSecondImage = item.imageUrl2 && item.imageUrl2.trim() !== '';
    const hasThirdImage = item.imageUrl3 && item.imageUrl3.trim() !== '';

    // Initialize the flatpickr for the date picker
    React.useEffect(() => {
        const bookings = item.bookings.map(booking => booking.bookingDate.split("T")[0]);
        // Dummy date to handle empty bookings
        const dates = bookings.length > 0 ? bookings : ["1999-12-12"];

        flatpickr("#datePicker", {
            minDate: "today",
            dateFormat: "Y-m-d",
            disable: dates,
            allowInput: true,
            onOpen: function (selectedDates, dateStr, instance) {
                instance.altInput.readOnly = true;
            },
            onClose: function (selectedDates, dateStr, instance) {
                instance.altInput.readOnly = false;
                instance.altInput.blur();
            }
        });
    }, [item.bookings]);

    return (
        <div className="listing-border">
            <h3 className="my-2 text">
                {item.name}
            </h3>

            <div className="row gx-2 justify-content-center">
                {!hasSecondImage && !hasThirdImage && (
                    // Only one image, so it's centered
                    <div className="col-md-12 justify-content-center text image-container">
                        <img alt={item.name} src={item.imageUrl} className="img-fluid single-image" />
                    </div>
                )}

                {hasSecondImage && !hasThirdImage && (
                    // Two images available, both should be displayed side by side
                    <div className="col-md-12 text image-container two-images">
                        <img alt={item.name} src={item.imageUrl} className="img-fluid" />
                        <img alt={item.name} src={item.imageUrl2} className="img-fluid" />
                    </div>
                )}

                {hasThirdImage && (
                    <div className="col-md-12 d-flex image-container">
                        // Main image to the left
                        <div className="main-image-wrapper">
                            <img alt={item.name} src={item.imageUrl} className="img-fluid main-image" />
                        </div>

                        // Additional images on the right
                        <div className="additional-images-wrapper">
                            {hasSecondImage && (
                                <img alt={item.name} src={item.imageUrl2} className="img-fluid additional-image" />
                            )}
                            {hasThirdImage && (
                                <img alt={item.name} src={item.imageUrl3} className="img-fluid additional-image" />
                            )}
                        </div>
                    </div>
                )}
                <div className="col-12 text-center text my-4">
                    <p>{item.description}</p>
                </div>

                <div className="row box-row">
                    {/* Left column for detailed information */}
                    <div className="col left-text text details">
                        <p>
                            Guests: {item.guests} <br />
                            Bedrooms: {item.rooms}<br />
                            Beds: {item.beds}<br />
                            Baths: {item.baths} <br /><br />
                            Phone number: {item.phone} <br />
                            Address: {item.address}<br />
                            Email: {item.customerUserEmail}
                        </p>
                    </div>

                    {/* Right column for booking box */}
                    <div className="col d-flex justify-content-end text">
                        <div className="border p-4 box">
                            <h3>{item.price.toFixed(0)} NOK per night</h3>

                            {/* Booking form */}
                            <form /* action and method to be defined as per your API */>
                                <div className="form-group text">
                                    <p>
                                        <input type="text" name="bookingDate" placeholder="Select Date.." id="datePicker" autoComplete="off" required />
                                    </p>
                                </div>
                                <div className="form-group">
                                    <input type="hidden" name="itemId" value={item.itemId} />
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
