import React, { useState } from 'react';
import axios from 'axios';
import './SendMail.css';

const SendMail = ({ onSendSuccess }) => {
    const [formData, setFormData] = useState({
        userEmail: '',
        subject: '',
        body: '',
    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const validateForm = () => {
        const newErrors = {};
        if (!formData.userEmail) newErrors.userEmail = 'User Email is required';
        else if (!/\S+@\S+\.\S+/.test(formData.userEmail)) newErrors.userEmail = 'Email address is invalid';
        if (!formData.subject) newErrors.subject = 'Subject is required';
        if (!formData.body) newErrors.body = 'Body is required';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        try {
            const response = await axios.post('/api/admin/sendemail', formData);
            alert('Email sent successfully');
            if (onSendSuccess) onSendSuccess(response.data); // Call onSendSuccess when email is sent successfully
        } catch (error) {
            console.error('Error sending email:', error);
            alert('Failed to send email');
        }
    };

    return (
        <div className='sendMail'>
            <div className="sendmail-container">
                <h1>Send Email</h1>
                <form onSubmit={handleSubmit} className="formSendMail">
                    <div className="form-group">
                        <label>User Email</label>
                        <input 
                            type="email" 
                            name="userEmail" 
                            className="form-control form-control-lg" 
                            value={formData.userEmail} 
                            onChange={handleChange} 
                        />
                        {errors.userEmail && <span className="error-message">{errors.userEmail}</span>}
                    </div>

                    <div className="form-group">
                        <label>Subject</label>
                        <input 
                            type="text" 
                            name="subject" 
                            className="form-control form-control-lg" 
                            value={formData.subject} 
                            onChange={handleChange} 
                        />
                        {errors.subject && <span className="error-message">{errors.subject}</span>}
                    </div>

                    <div className="form-group">
                        <label>Message</label>
                        <textarea 
                            name="body" 
                            className="form-control form-control-lg" 
                            style={{height: '60px', width: '583px'}} 
                            value={formData.body} 
                            onChange={handleChange}
                        />
                        {errors.body && <span className="error-message">{errors.body}</span>}
                    </div>

                    <div className="mt-3">
                        <button type="submit" className="btn btn-primary">Send Email</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SendMail;
