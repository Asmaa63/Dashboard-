import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Edit.css';
import { useParams } from 'react-router-dom';

const Edit = () => {
    const { userId } = useParams(); // Get userId from URL parameter
    const [formData, setFormData] = useState({
        id: '',
        displayName: '',
        email: '',
        password: '',
        role: 'user',
        image: null,
    });
    const [loading, setLoading] = useState(true);
    const token = JSON.parse(localStorage.getItem('user'))?.token;
    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (userId) {
            fetchUser(userId);
        }
    }, [userId]);

    const fetchUser = async (userId) => {
        try {
            const response = await axios.get(`http://plantify.runasp.net/api/Dashboard/get-user-details?id=${userId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            setFormData(response.data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching user details:', error);
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === 'image') {
            setFormData({
                ...formData,
                image: files[0], // Set the image file
            });
        } else {
            setFormData({
                ...formData,
                [name]: value,
            });
        }
    };

    const validateForm = () => {
        const newErrors = {};
        if (!formData.displayName) newErrors.displayName = 'Display Name is required';
        if (!formData.email) newErrors.email = 'Email is required';
        else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email address is invalid';
        if (!formData.password) newErrors.password = 'Password is required';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Form submitted"); // Check if this logs in the console
        if (!validateForm()) return;

        try {
            const url = "http://plantify.runasp.net/api/Dashboard/update-user";
            const params = new URLSearchParams({
                id: formData.id,
                role: formData.role,
                name: formData.displayName,
                email: formData.email,
            });

            // Prepare form data for image if it exists
            const formDataToSubmit = new FormData();
            if (formData.image) {
                formDataToSubmit.append('image', formData.image);
            }

            const response = await axios.put(`${url}?${params.toString()}`, formDataToSubmit, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data'
                }
            });

            alert('User updated successfully');
        } catch (error) {
            console.error('Error updating user:', error);
            alert('Failed to update user');
        }
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    return (
        <div className='editUser'>
            <div className="edit-container">
                <h1>Update User</h1>
                <form onSubmit={handleSubmit} className='edit-form'>
                    <div className="form-group">
                        <label>Name</label>
                        <input 
                            type="text" 
                            name="displayName" 
                            className="form-control form-control-lg" 
                            value={formData.displayName} 
                            onChange={handleChange} 
                        />
                        {errors.displayName && <span className="error">{errors.displayName}</span>}
                    </div>

                    <div className="input-row">
                        <div className="form-group">
                            <label>Email</label>
                            <input 
                                type="email" 
                                name="email" 
                                className="form-control form-control-lg" 
                                value={formData.email} 
                                onChange={handleChange} 
                            />
                            {errors.email && <span className="error">{errors.email}</span>}
                        </div>

                        <div className="form-group">
                            <label>Role</label>
                            <select 
                                name="role" 
                                className="form-control form-control-lg" 
                                value={formData.role} 
                                onChange={handleChange}
                            >
                                <option value="user">User</option>
                                <option value="admin">Admin</option>
                            </select>
                            {errors.role && <span className="error">{errors.role}</span>}
                        </div>
                    </div>
                    
                    <div className="form-group">
                        <label>Upload Image</label>
                        <label className="file-upload">
                            <input 
                                type="file" 
                                name="image" 
                                accept="image/*" 
                                onChange={handleChange} 
                            />
                            <span className="button">Upload Image</span>
                        </label>
                    </div>

                    <div className="mt-3">
                        <button type="submit" className="btn btn-primary">Update</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Edit;
