import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
const UpdateListing = () => {
    const [item, setItem] = useState({
        // Initialize the state with all the fields you need
        itemId: '',
        name: '',
        price: '',
        description: '',
        address: '',
        phone: '',
        rooms: '',
        beds: '',
        guests: '',
        baths: '',
    });
    const { itemId } = useParams(); // Get the item ID from the URL
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch the item details using itemId and set it in state
        fetch(`/Item/GetItem/${itemId}`)
            .then(response => response.json())
            .then(data => {
                if (data) {
                    setItem(data);
                } else {
                    console.error('Item not found');
                }
            })
            .catch(error => console.error('Unable to get item:', error));
    }, [itemId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setItem(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // You'll need to handle the form submission here
        console.log('Form submitted:', item);
        // Implement the update logic, possibly using a POST request
    };

    const handleCancel = () => {
        navigate.push('/table'); // Navigate back to the table view
    };

    return (
        <div>
            <h2>Update Listing</h2>
            <form onSubmit={handleSubmit} encType="multipart/form-data">
                <input type="hidden" name="itemId" value={item.itemId} />

                <div className="form-group">
                    <label>Name</label>
                    <input type="text" name="name" className="form-control" value={item.name} onChange={handleChange} />
                </div>

                <div className="form-group">
                    <label>Price</label>
                    <input type="number" name="price" className="form-control" value={item.price} onChange={handleChange} />
                </div>

                <div className="form-group">
                    <label>Description</label>
                    <textarea name="description" className="form-control" value={item.description} onChange={handleChange} />
                </div>

                <div className="form-group">
                    <label>Phone</label>
                    <input type="tel" name="phone" className="form-control" value={item.phone} onChange={handleChange} />
                </div>

                <div className="form-group">
                    <label>Rooms</label>
                    <input type="number" name="rooms" className="form-control" value={item.rooms} onChange={handleChange} />
                </div>

                <div className="form-group">
                    <label>Beds</label>
                    <input type="number" name="beds" className="form-control" value={item.beds} onChange={handleChange} />
                </div>

                <div className="form-group">
                    <label>Guests</label>
                    <input type="number" name="guests" className="form-control" value={item.guests} onChange={handleChange} />
                </div>

                <div className="form-group">
                    <label>Baths</label>
                    <input type="number" name="baths" className="form-control" value={item.baths} onChange={handleChange} />
                </div>

                <div className="form-group">
                    <label htmlFor="ImageUpload">Image 1</label>
                    <input type="file" id="ImageUpload" name="ImageUpload" className="form-control" accept="image/*" />
                </div>

                <div className="form-group">
                    <label htmlFor="ImageUpload2">Image 2</label>
                    <input type="file" id="ImageUpload2" name="ImageUpload2" className="form-control" accept="image/*" />
                </div>

                <div className="form-group">
                    <label htmlFor="ImageUpload3">Image 3</label>
                    <input type="file" id="ImageUpload3" name="ImageUpload3" className="form-control" accept="image/*" />
                </div>

                <button type="submit" className="btn btn-primary mt-3">Save Changes</button>
                <button type="button" onClick={handleCancel} className="btn btn-secondary mt-3">Cancel</button>
            </form>
        </div>
    );
};

export default UpdateListing;
