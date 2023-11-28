import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


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
    setItems({ ...items, [event.target.name]: event.target.files[0] });
};

    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        Object.keys(items).forEach(key => formData.append(key, items[key]));

        if (!items.Name || !items.Price || !items.ImageUpload) {
        alert("Please fill in all required fields.");
        return;
    }
        try {
            const response = await axios.post('/Item/Create', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });

            if (response.status === 200) {
                // Handle success (e.g., clear the form or redirect)
                setItems({
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
                console.log("Navigating to home");

                navigate("/");
            } else {
                // Handle server-side validation error or other non-200 responses
                alert("Failed to create item. Please try again.");
            }
        } catch (error) {
            console.error('Error:', error);
            alert("An error occurred while creating the item.");
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
                <input type="number" name="Phone" value={items.Phone} onChange={handleInputChange} />
            </div>
            <div className="form-group">
                <label htmlFor="Rooms">Rooms</label>
                <input type="number" name="Rooms" value={items.Rooms} onChange={handleInputChange} />
            </div>
            <div className="form-group">
                <label htmlFor="Beds">Beds</label>
                <input type="number" name="Beds" value={items.Beds} onChange={handleInputChange} />
            </div>
            <div className="form-group">
                <label htmlFor="Guests">Guests</label>
                <input type="number" name="Guests" value={items.Guests} onChange={handleInputChange} />
            </div>
            <div className="form-group">
                <label htmlFor="Baths">Baths</label>
                <input type="number" name="Baths" value={items.Baths} onChange={handleInputChange} />
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
                <button className="btn btn-primary" style={{ marginTop: '20px' }}>Submit</button>
        </form>
    </div>
);


};

export default CreateItem;