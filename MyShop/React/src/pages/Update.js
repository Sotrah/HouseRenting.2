import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useItems } from '../components/ItemContext';

const UpdateListing = () => {
    const [itemFields, setItemFields] = useState({
        itemId: '',
        Name: '',
        Price: '',
        Description: '',
        Address: '',
        Phone: '',
        Rooms: '',
        Beds: '',
        Guests: '',
        Baths: '',
        ImageUrl: '',
        ImageUrl2: '',
        ImageUrl3: '',
        ImageUpload: null,
        ImageUpload2: null,
        ImageUpload3: null,
    });
    const { itemId } = useParams();
    const navigate = useNavigate();
    const { fetchItems } = useItems();

    useEffect(() => {
        axios.get(`/Item/GetItem/${itemId}`)
            .then(response => response.data) 
            .then(data => {
                setItemFields({
                    itemId: data.itemId,
                    Name: data.name || '',
                    Price: data.price ? data.price.toString() : '',
                    Description: data.description || '',
                    Address: data.address || '',
                    Phone: data.phone || '',
                    Rooms: data.rooms || '',
                    Beds: data.beds || '',
                    Guests: data.guests || '',
                    Baths: data.baths || '',
                    ImageUrl: data.imageUrl || '',
                    ImageUrl2: data.imageUrl2 || '',
                    ImageUrl3: data.imageUrl3 || '',
                    ImageUpload: null,
                    ImageUpload2: null,
                    ImageUpload3: null,
                });
            })
            .catch(error => console.error('Unable to get item:', error));
    }, [itemId]);

    const handleFileChange = (e) => {
        setItemFields({ ...itemFields, [e.target.name]: e.target.files[0] });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setItemFields(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('itemId', itemFields.itemId);
        for (const key in itemFields) {
            if (itemFields[key] !== null && key !== 'itemId' && !key.startsWith('ImageUpload')) {
                formData.append(key, itemFields[key]);
            }
        }

        if (itemFields.ImageUpload) {
            formData.append('ImageUpload', itemFields.ImageUpload);
        }
        if (itemFields.ImageUpload2) {
            formData.append('ImageUpload2', itemFields.ImageUpload2);
        }
        if (itemFields.ImageUpload3) {
            formData.append('ImageUpload3', itemFields.ImageUpload3);
        }

        try {
            const response = await axios.put(`http://localhost:7205/api/Item/Update/${itemId}`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });

            if (response.status >= 200 && response.status < 300) {
                fetchItems();
                navigate('/EditListings/');
            } else {
                alert('Failed to update item. Please try again.');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred while updating the item.');
        }
    };

    const handleCancel = () => {
        navigate('/EditListings/'); // Navigate back to the table view
    };

    return (
        <div>
            <h2>Update Listing</h2>
            <form onSubmit={handleSubmit} encType="multipart/form-data">
                <input type="hidden" name="itemId" value={itemFields.itemId} />

                <div className="form-group">
                    <label>Name</label>
                    <input type="text" name="Name" className="form-control" value={itemFields.Name} onChange={handleChange} />
                </div>

                <div className="form-group">
                    <label>Price</label>
                    <input type="number" name="Price" className="form-control" value={itemFields.Price} onChange={handleChange} />
                </div>

                <div className="form-group">
                    <label>Description</label>
                    <textarea name="Description" className="form-control" value={itemFields.Description} onChange={handleChange} />
                </div>

                <div className="form-group">
                    <label>Phone</label>
                    <input type="tel" name="Phone" className="form-control" value={itemFields.Phone} onChange={handleChange} />
                </div>

                <div className="form-group">
                    <label>Rooms</label>
                    <input type="number" name="Rooms" className="form-control" value={itemFields.Rooms} onChange={handleChange} />
                </div>

                <div className="form-group">
                    <label>Beds</label>
                    <input type="number" name="Beds" className="form-control" value={itemFields.Beds} onChange={handleChange} />
                </div>

                <div className="form-group">
                    <label>Guests</label>
                    <input type="number" name="Guests" className="form-control" value={itemFields.Guests} onChange={handleChange} />
                </div>

                <div className="form-group">
                    <label>Baths</label>
                    <input type="number" name="Baths" className="form-control" value={itemFields.Baths} onChange={handleChange} />
                </div>

                <div className="form-group">
                    <label htmlFor="ImageUpload">Image 1</label>
                    <input type="file" id="ImageUpload" name="ImageUpload" className="form-control" accept="image/*" onChange={handleFileChange} />
                </div>

                <div className="form-group">
                    <label htmlFor="ImageUpload2">Image 2</label>
                    <input type="file" id="ImageUpload2" name="ImageUpload2" className="form-control" accept="image/*" onChange={handleFileChange} />
                </div>

                <div className="form-group">
                    <label htmlFor="ImageUpload3">Image 3</label>
                    <input type="file" id="ImageUpload3" name="ImageUpload3" className="form-control" accept="image/*" onChange={handleFileChange} />
                </div>

                <button type="submit" className="btn btn-primary mt-3">Save Changes</button>
                <button type="button" onClick={handleCancel} className="btn btn-secondary mt-3">Cancel</button>
            </form>
        </div>
    );
};

export default UpdateListing;
