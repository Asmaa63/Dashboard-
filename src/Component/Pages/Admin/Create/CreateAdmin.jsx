import React, { useState } from 'react';
import axios from 'axios';
import imageCompression from 'browser-image-compression';
import '../../User/Create/Create.css';
import { useNavigate } from 'react-router-dom';

const CreateAdmin = ({ onCreateSuccess }) => {
    const [formData, setFormData] = useState({
        displayName: '',
        email: '',
        password: '',
        image: null,
        imageUploading: false,
    });
    const [showPopup, setShowPopup] = useState(false);
    const token = JSON.parse(localStorage.getItem('user')).token;
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const handleChange = async (e) => {
        const { name, value, files } = e.target;
        if (name === 'image') {
            setFormData({
                ...formData,
                image: files[0],
                imageUploading: true,
            });
            try {
                const compressedImage = await imageCompression(files[0], { maxSizeMB: 1 });
                setFormData({
                    ...formData,
                    image: compressedImage,
                    imageUploading: false,
                });
            } catch (error) {
                console.error('Error compressing image:', error);
                setFormData({
                    ...formData,
                    imageUploading: false,
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
        if (!formData.password) newErrors.password = 'Password is required';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        try {
            const url = 'http://plantify.runasp.net/api/Dashboard/create-admin';
            const params = new URLSearchParams({
                name: formData.displayName,
                email: formData.email,
                password: formData.password,
            });

            const formDataToSubmit = new FormData();
            if (formData.image) {
                formDataToSubmit.append('image', formData.image, formData.image.name);
            }

            const response = await axios.post(`${url}?${params.toString()}`, formDataToSubmit, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',
                },
            });

            setShowPopup(true);
            setTimeout(() => {
                setShowPopup(false);
                navigate('/DashboardMain/ListAdmin', { state: { showPopup: true } });
            }, 2000);

            if (onCreateSuccess) onCreateSuccess(response.data);
        } catch (error) {
            console.error('Error creating admin:', error);
            alert('Failed to create admin');
        }
    };

    return (
        <div className='createUser'>
            <div className="create-container">
                <h1>Create Admin</h1>
                <form onSubmit={handleSubmit} className="formCreate">
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
                            {formData.imageUploading ? 'Creating...' : 'Create'}
                        </button>
                    </div>
                </form>
                {showPopup && <div className="popup-message">Admin created successfully!</div>}
            </div>
        </div>
    );
};

export default CreateAdmin;
