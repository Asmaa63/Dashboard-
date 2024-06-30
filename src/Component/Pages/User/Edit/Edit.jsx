import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Edit.css';
import { useParams, useNavigate } from 'react-router-dom';
import imageCompression from 'browser-image-compression';

const Edit = () => {
    const { userId } = useParams(); // Get userId from URL parameter
    const [formData, setFormData] = useState({
        id: '',
        displayName: '',
        email: '',
        password: '',
        role: 'User',
        image: null,
        imageUploading: false, // Add imageUploading state
    });
    const [loading, setLoading] = useState(true);
    const token = JSON.parse(localStorage.getItem('user'))?.token;
    const [errors, setErrors] = useState({});
    const [showNotification, setShowNotification] = useState(false);
    const [notificationMessage, setNotificationMessage] = useState('');
    const navigate = useNavigate(); // Initialize useNavigate

    const showSuccessNotification = () => {
        setNotificationMessage('User updated successfully');
        setShowNotification(true);
        setTimeout(() => {
            setShowNotification(false);
        }, 3000); // Hide after 3 seconds
    };

    const showFailureNotification = () => {
        setNotificationMessage('Failed to update user');
        setShowNotification(true);
        setTimeout(() => {
            setShowNotification(false);
        }, 3000); // Hide after 3 seconds
    };

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
            setFormData({
                ...response.data,
                image: null // Reset image to null when fetching user data
            });
            setLoading(false);
        } catch (error) {
            console.error('Error fetching user details:', error);
            setLoading(false);
        }
    };

    const handleChange = async (e) => {
        const { name, value, files } = e.target;
        if (name === 'image' && files.length > 0) {
            setFormData({
                ...formData,
                imageUploading: true, // Start uploading state
            });

            try {
                // Get the file extension
                const originalFile = files[0];
                const fileExtension = originalFile.name.split('.').pop();
                
                // Compress the image
                const compressedImage = await imageCompression(originalFile, { maxSizeMB: 1 });

                // Create a new file with the same name and original extension
                const compressedImageWithExtension = new File([compressedImage], `${compressedImage.name}.${fileExtension}`, { type: compressedImage.type });

                setFormData({
                    ...formData,
                    image: compressedImageWithExtension,
                    imageUploading: false, // Upload complete
                });
            } catch (error) {
                console.error('Error compressing image:', error);
                setFormData({
                    ...formData,
                    imageUploading: false, // Upload failed
                });
            }
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
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
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

            await axios.put(`${url}?${params.toString()}`, formDataToSubmit, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data'
                }
            });

            showSuccessNotification(); // Show success notification
            setTimeout(() => {
                navigate('/DashboardMain/UserList'); // Navigate to the specified path
            }, 2000);
        } catch (error) {
            console.error('Error updating user:', error);
            showFailureNotification();
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
                                <option value="User">User</option>
                                <option value="Agricultural engineer">Agricultural engineer</option>
                                <option value="Botanist">Botanist</option>
                                <option value="Expert">Expert</option>
                            </select>
                            {errors.role && <span className="error">{errors.role}</span>}
                        </div>
                    </div>
                    
                    <div className="form-group">
                        <label>Upload Image</label>
                        <label className={`file-upload ${formData.imageUploading ? 'uploading' : formData.image ? 'uploaded' : ''}`}>
                            <input
                                type="file"
                                name="image"
                                accept="image/*"
                                onChange={handleChange}
                                className={formData.imageUploading ? 'uploading' : formData.image ? 'uploaded' : ''}
                            />
                            <span className={`button ${formData.imageUploading ? 'uploading' : formData.image ? 'uploaded' : ''}`}>
                                {formData.imageUploading ? 'Uploading...' : formData.image ? 'Uploaded' : 'Upload Image'}
                            </span>
                        </label>
                        {formData.image && !formData.imageUploading 
                            
                        }
                    </div>

                    <div className="mt-3">
                        <button type="submit" className="btn btn-primary" disabled={formData.imageUploading}>
                            Update
                        </button>
                    </div>
                </form>
            </div>
            {showNotification && (
                <div className={`notification ${notificationMessage.includes('successfully') ? 'success' : 'error'}`}>
                    {notificationMessage}
                </div>
            )}
        </div>
    );
};

export default Edit;
