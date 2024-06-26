import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Edit.css';
import { Link } from 'react-router-dom';

const Edit = ({ userId }) => {
    const [user, setUser] = useState({
        displayName: '',
        email: '',
        role: 'User', // Set default role if needed
        avatar: null, // To store the selected file
    });

    const [errors, setErrors] = useState({});

    const roles = ['User', 'Admin', 'Moderator']; // Add more roles as needed

    useEffect(() => {
        // Load user details when component mounts
        fetchUser();
    }, []);

    const fetchUser = async () => {
        try {
            // Replace with your API call to fetch user details
            const response = await axios.get(`/api/users/${userId}`);
            setUser(response.data);
        } catch (error) {
            console.error('Error fetching user details:', error);
        }
    };

    const handleChange = (e) => {
        const { name, value, files } = e.target;

        // Handle file input separately
        if (name === 'avatar') {
            setUser({
                ...user,
                avatar: files[0], // Assuming single file selection
            });
        } else {
            setUser({
                ...user,
                [name]: value,
            });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formDataToSubmit = new FormData();
            formDataToSubmit.append('displayName', user.displayName);
            formDataToSubmit.append('email', user.email);
            formDataToSubmit.append('role', user.role);
            formDataToSubmit.append('avatar', user.avatar); // Append the avatar file

            // Replace with your API call to update user details
            await axios.post('/api/users/update', formDataToSubmit, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            alert('User updated successfully');
        } catch (error) {
            console.error('Error updating user:', error);
            if (error.response && error.response.data) {
                setErrors(error.response.data.errors || {});
            }
        }
    };

    return (
        <div className='editUser'>
            <div className="edit-container">
                <h1>Update User</h1>
                <form onSubmit={handleSubmit} className='formUdit '>
                    <div className="form-group">
                        <label>Name</label>
                        <input 
                            type="text" 
                            name="displayName" 
                            className="form-control form-control-lg" 
                            value={user.displayName} 
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
                            value={user.email} 
                            onChange={handleChange} 
                        />
                        {errors.email && <span className="error">{errors.email}</span>}
                    </div>

                    <div className="form-group">
                        <label>Role</label>
                        <select 
                            name="role" 
                            className="form-control form-control-lg" 
                            value={user.role} 
                            onChange={handleChange}
                        >
                            {roles.map((role) => (
                                <option key={role} value={role}>
                                    {role}
                                </option>
                            ))}
                        </select>
                        {errors.role && <span className="error">{errors.role}</span>}
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
                        <button type="submit" className="btn btn-primary">Update</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Edit;
