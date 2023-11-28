import React, { useState } from 'react';
import axios from 'axios';

const CreateItem = () => {
    const [items, setItems] = useState({
        Name: '',
        Price: '',
        Description: '',
        Address: '',
        Phone: '',
        Rooms: '',
        Beds: '',
        Guests: '',
        Baths: '',
        ImageUpload: null,
        ImageUpload2: null,
        ImageUpload3: null,
    });

  
const handleInputChange = (event) => {
    const { name, value } = event.target;
    setItems({ ...items, [name]: value });
};

const handleFileChange = (event) => {
    setItems({ ...itemData, [event.target.name]: event.target.files[0] });
};

const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    Object.keys(items).forEach(key => formData.append(key, items[key]));

    try {
        // Send data til serveren
        const response = await axios.post('/Item/Create', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        // Håndter respons
    } catch (error) {
        console.error('Error:', error);
    }
};

return (
    <div className="container">
        <h2>Create Listing</h2>
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label htmlFor="Name">Name</label>
                <input type="text" name="Name" value={items.Name} onChange={handleInputChange} />
            </div>
            <div className="form-group">
                <label htmlFor="Price">Price per night</label>
                <input type="text" name="Price" value={items.Price} onChange={handleInputChange} />
            </div>
            <div className="form-group">
                <label htmlFor="Description">Description</label>
                <input type="text" name="Description" value={items.Description} onChange={handleInputChange} />
            </div>
            <div className="form-group">
                <label htmlFor="Address">Address</label>
                <input type="text" name="Address" value={items.Address} onChange={handleInputChange} />
            </div>
            <div className="form-group">
                <label htmlFor="Phone">Phone number</label>
                <input type="text" name="Phone" value={items.Phone} onChange={handleInputChange} />
            </div>
            <div className="form-group">
                <label htmlFor="Rooms">Rooms</label>
                <input type="text" name="Rooms" value={items.Rooms} onChange={handleInputChange} />
            </div>
            <div className="form-group">
                <label htmlFor="Beds">Beds</label>
                <input type="text" name="Beds" value={items.Beds} onChange={handleInputChange} />
            </div>
            <div className="form-group">
                <label htmlFor="Guests">Guests</label>
                <input type="text" name="Guests" value={items.Guests} onChange={handleInputChange} />
            </div>
            <div className="form-group">
                <label htmlFor="Baths">Baths</label>
                <input type="text" name="Baths" value={items.Baths} onChange={handleInputChange} />
            </div>
            <div className="form-group">
                <label htmlFor="ImageUpload">Image 1</label>
                <input type="file" name="ImageUpload" onChange={handleFileChange} />
            </div>
            <div className="form-group">
                <label htmlFor="ImageUpload2">Image 2</label>
                <input type="file" name="ImageUpload2" onChange={handleFileChange} />
            </div>
            <div className="form-group">
                <label htmlFor="ImageUpload3">Image 3</label>
                <input type="file" name="ImageUpload3" onChange={handleFileChange} />
            </div>
            <button type="submit" className="btn btn-primary">Create</button>
        </form>
    </div>
);


};

export default CreateItem;