import React, { useState } from 'react';
import axios from 'axios';
import './Create.css';

const Create = ({ onCreateSuccess }) => {
    const [formData, setFormData] = useState({
        id: '',
        displayName: '',
        email: '',
        password: '',
        avatar: null, // To store the selected file
        role: 'user', // Default role
    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value, files } = e.target;

        // Handle file input separately
        if (name === 'avatar') {
            setFormData({
                ...formData,
                avatar: files[0], // Assuming single file selection
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
        if (!validateForm()) return;

        try {
            const formDataToSubmit = new FormData();
            formDataToSubmit.append('id', formData.id);
            formDataToSubmit.append('displayName', formData.displayName);
            formDataToSubmit.append('email', formData.email);
            formDataToSubmit.append('password', formData.password);
            formDataToSubmit.append('avatar', formData.avatar);
            formDataToSubmit.append('role', formData.role);

            const response = await axios.post('/api/users/create', formDataToSubmit, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            alert('User created successfully');
            if (onCreateSuccess) onCreateSuccess(response.data);
        } catch (error) {
            console.error('Error creating user:', error);
            alert('Failed to create user');
        }
    };

    return (
        <div className='createUser'>
            <div className="create-container">
                <h1>Create User</h1>
                <form onSubmit={handleSubmit} className="formCreate">
                    <input 
                        type="hidden" 
                        name="id" 
                        value={formData.id} 
                    />

                    <div className="input-row">
                        <div className="form-group">
                            <label>Name</label>
                            <input 
                                type="text" 
                                name="displayName" 
                                className="form-control form-control-lg" 
                                value={formData.displayName} 
                                onChange={handleChange} 
                            />
                            {errors.displayName && <span className="error-message">{errors.displayName}</span>}
                        </div>

                        <div className="form-group">
                            <label>Email</label>
                            <input 
                                type="email" 
                                name="email" 
                                className="form-control form-control-lg" 
                                value={formData.email} 
                                onChange={handleChange} 
                            />
                            {errors.email && <span className="error-message">{errors.email}</span>}
                        </div>
                    </div>

                    <div className="input-row">
                        <div className="form-group">
                            <label>Password</label>
                            <input 
                                type="password" 
                                name="password" 
                                className="form-control form-control-lg" 
                                value={formData.password} 
                                onChange={handleChange} 
                            />
                            {errors.password && <span className="error-message">{errors.password}</span>}
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
                        </div>
                    </div>

                    <div className="form-group">
                        <label>Upload Image</label>
                        <label className="file-upload">
                            <input 
                                type="file" 
                                name="avatar" 
                                accept="image/*" 
                                onChange={handleChange} 
                            />
                            <span className="button">Upload Image</span>
                        </label>
                    </div>

                    <div className="mt-3">
                        <button type="submit" className="btn btn-primary">Create</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Create;
