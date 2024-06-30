import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import imageCompression from 'browser-image-compression';

const EditAdmin = () => {
    const { userId } = useParams(); // Get userId from URL parameter
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        id: '',
        displayName: '',
        email: '',
        role: 'Admin', // Set default role if needed
        image: null, // To store the selected file
        imageUploading: false, // To track image upload status
    });
    const [loading, setLoading] = useState(true);
    const token = JSON.parse(localStorage.getItem('user'))?.token;
    const [errors, setErrors] = useState({});
    const [showNotification, setShowNotification] = useState(false);
    const [notificationMessage, setNotificationMessage] = useState('');

    const showSuccessNotification = () => {
        setNotificationMessage('Admin updated successfully');
        setShowNotification(true);
        setTimeout(() => {
            setShowNotification(false);
        }, 2000); // Hide after 2 seconds
    };

    const showFailureNotification = () => {
        setNotificationMessage('Failed to update admin');
        setShowNotification(true);
        setTimeout(() => {
            setShowNotification(false);
        }, 2000); // Hide after 2 seconds
    };

    useEffect(() => {
        if (userId) {
            fetchAdmin(userId);
        }
    }, [userId]);

    const fetchAdmin = async (userId) => {
        try {
            const response = await axios.get(`http://plantify.runasp.net/api/Dashboard/get-admin-details?id=${userId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            setFormData(response.data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching admin details:', error);
            setLoading(false);
        }
    };

    const handleChange = async (e) => {
        const { name, value, files } = e.target;
        if (name === 'image') {
            setFormData({
                ...formData,
                image: files[0], // Set the image file
                imageUploading: true, // Start uploading
            });
            try {
                const compressedImage = await imageCompression(files[0], { maxSizeMB: 1 });
                setFormData({
                    ...formData,
                    image: compressedImage,
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
            const url = "http://plantify.runasp.net/api/Dashboard/update-admin";
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
                navigate('/DashboardMain/ListAdmin'); // Redirect to the admin list page
            }, 2000);
        } catch (error) {
            console.error('Error updating admin:', error);
            showFailureNotification();
        }
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    return (
        <div className='editUser'>
            <div className="edit-container">
                <h1>Update Admin</h1>
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
                                <option value="Admin">Admin</option>
                                {/* Add more roles as needed */}
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

export default EditAdmin;
