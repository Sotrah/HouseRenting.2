import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useItems } from '../components/ItemContext';

const UpdateListing = () => {
    const [itemFields, setItemFields] = useState({
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
        ImageUpload: null,
        ImageUpload2: null,
        ImageUpload3: null,
    });
    const { itemId } = useParams(); // Get the item ID from the URL
    const navigate = useNavigate();
    const { fetchItems } = useItems(); // Use the fetchItems function from context

    useEffect(() => {
        // Fetch the item details using itemId
        fetch(`/Item/GetItem/${itemId}`)
            .then(response => response.json())
            .then(data => setItemFields(data))
            .catch(error => console.error('Unable to get item:', error));
    }, [itemId]);


    const handleFileChange = (e) => {
        setItemFields({ ...itemFields, [e.target.name]: e.target.files[0] });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        Object.keys(itemFields).forEach(key => {
            // Append files and other fields separately
            if (key === 'ImageUpload' || key === 'ImageUpload2' || key === 'ImageUpload3') {
                if (itemFields[key] instanceof File) {
                    formData.append(key, itemFields[key]);
                }
            } else {
                formData.append(key, itemFields[key]);
            }
        });

        try {
            const response = await axios.put(`/Item/Update/${itemId}`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });

            if (response.status >= 200 && response.status < 300) {
                fetchItems(); // Update the item list
                navigate('/'); // Navigate to the home page or listings page
            } else {
                alert('Failed to update item. Please try again.');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred while updating the item.');
        }
    };

    const handleCancel = () => {
        navigate.push('/EditListings'); // Navigate back to the table view
    };

    return (
        <div>
            <h2>Update Listing</h2>
            <form onSubmit={handleSubmit} encType="multipart/form-data">
                <input type="hidden" name="itemId" value={itemFields.itemId} />

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
