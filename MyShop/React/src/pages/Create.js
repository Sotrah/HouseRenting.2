import React, { createContext, useState, useEffect, useContext, useCallback } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useItems } from '../components/ItemContext';
const CreateItem = () => {
    // Correctly initialize your item's form fields
    const [itemFields, setItemFields] = useState({
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

    const { fetchItems } = useItems(); // Destructure fetchItems from the hook
    const navigate = useNavigate();
    const [validationErrors, setValidationErrors] = useState({});

    const validateField = (name, value) => {
        switch (name) {
            case 'Name':
                return /^[0-9a-zA-ZæøåÆØÅ.' \-]{2,20}$/.test(value) ? '' : 'The Name must be numbers or letters and between 2 to 20 characters.';
            case 'Phone':
                return /^[0-9]{8,15}$/.test(value) ? '' : 'The Phone number must be between 8 and 15 digits';
            case 'Rooms':
            case 'Beds':
            case 'Guests':
            case 'Baths':
                return /^[0-9]{1,2}$/.test(value) && parseInt(value) >= 1 && parseInt(value) <= 50 ? '' : 'Must be a number between 1 and 50';
            default:
                return '';
        }
    };
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setItemFields({ ...itemFields, [name]: value });

        const errorMessage = validateField(name, value);
        setValidationErrors(prevState => ({
            ...prevState,
            [name]: errorMessage
        }));
    };


    const handleFileChange = (event) => {
        setItemFields({ ...itemFields, [event.target.name]: event.target.files[0] });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        // Declare formData at the beginning
        const formData = new FormData();

        // Check if at least one image is uploaded and other fields are filled
        if (!itemFields.Name || !itemFields.Price || !(itemFields.ImageUpload || itemFields.ImageUpload2 || itemFields.ImageUpload3)) {
            alert("Please fill in all required fields, including at least one image.");
            return;
        }

        // Append non-null fields to formData
        Object.keys(itemFields).forEach(key => {
            if (itemFields[key] !== null) {
                formData.append(key, itemFields[key]);
            }
        });
        try {
            const response = await axios.post('/Item/Create', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });

            if (response.status >= 200 && response.status < 300) {
                setItemFields({
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
                fetchItems(); // Call fetchItems to update the item list
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



return (
    <div className="container">
        <h2>Create Listing</h2>
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label htmlFor="Name">Name</label>
                <input type="text" name="Name" value={itemFields.Name} onChange={handleInputChange} />
                {validationErrors.Name && <div className="text-danger">{validationErrors.Name}</div>}
            </div>
            <div className="form-group">
                <label htmlFor="Price">Price per night</label>
                <input type="text" name="Price" value={itemFields.Price} onChange={handleInputChange} />
            </div>
            <div className="form-group">
                <label htmlFor="Description">Description</label>
                <input type="text" name="Description" value={itemFields.Description} onChange={handleInputChange} />
            </div>
            <div className="form-group">
                <label htmlFor="Address">Address</label>
                <input type="text" name="Address" value={itemFields.Address} onChange={handleInputChange} />
                {validationErrors.Address && <div className="text-danger">{validationErrors.Address}</div>}
            </div>
            <div className="form-group">
                <label htmlFor="Phone">Phone number</label>
                <input type="number" name="Phone" value={itemFields.Phone} onChange={handleInputChange} />
                {validationErrors.Phone && <div className="text-danger">{validationErrors.Phone}</div>}
            </div>
            <div className="form-group">
                <label htmlFor="Rooms">Rooms</label>
                <input type="number" name="Rooms" value={itemFields.Rooms} onChange={handleInputChange} />
                {validationErrors.Rooms && <div className="text-danger">{validationErrors.Rooms}</div>}
            </div>
            <div className="form-group">
                <label htmlFor="Beds">Beds</label>
                <input type="number" name="Beds" value={itemFields.Beds} onChange={handleInputChange} />
                {validationErrors.Beds && <div className="text-danger">{validationErrors.Beds}</div>}
            </div>
            <div className="form-group">
                <label htmlFor="Guests">Guests</label>
                <input type="number" name="Guests" value={itemFields.Guests} onChange={handleInputChange} />
                {validationErrors.Guests && <div className="text-danger">{validationErrors.Guests}</div>}
            </div>
            <div className="form-group">
                <label htmlFor="Baths">Baths</label>
                <input type="number" name="Baths" value={itemFields.Baths} onChange={handleInputChange} />
                {validationErrors.Baths && <div className="text-danger">{validationErrors.Baths}</div>}
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