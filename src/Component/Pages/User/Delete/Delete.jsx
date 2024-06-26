import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Delete.css';

const Delete = ({ userId, onDeleteSuccess }) => {
    const [user, setUser] = useState({
        id: '',
        displayName: '',
        email: '',
        role: 'User', // Default to 'User' if role is empty
    });

    const [error, setError] = useState('');

    const roles = ['User', 'Admin']; // List of roles

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
            setError('Error fetching user details');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Replace with your API call to delete user
            await axios.delete(`/api/users/delete/${userId}`);
            alert('User deleted successfully');
            if (onDeleteSuccess) onDeleteSuccess();
        } catch (error) {
            console.error('Error deleting user:', error);
            setError('Error deleting user');
        }
    };

    return (
        <div className='deleteUser'>
            <div className="delete-container">
                <h1>Are you sure you want to delete this user?</h1>
                {error && <div className="error-message">{error}</div>}
                <form onSubmit={handleSubmit} className="formDelete">
                    <div className="form-row">
                        <div className="form-group">
                            <label>Id</label>
                            <input 
                                type="text" 
                                name="id" 
                                className="form-control form-control-lg" 
                                value={user.id} 
                                readOnly 
                            />
                        </div>
                        <div className="form-group">
                            <label>Display Name</label>
                            <input 
                                type="text" 
                                name="displayName" 
                                className="form-control form-control-lg" 
                                value={user.displayName} 
                                readOnly 
                            />
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label>Email</label>
                            <input 
                                type="email" 
                                name="email" 
                                className="form-control form-control-lg" 
                                value={user.email} 
                                readOnly 
                            />
                        </div>
                        <div className="form-group">
                            <label>Role</label>
                            <select 
                                name="role" 
                                className="form-control form-control-lg" 
                                value={user.role} 
                                readOnly // Keep the dropdown readonly
                            >
                                {roles.map((role) => (
                                    <option key={role} value={role}>
                                        {role}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className="mt-3">
                        <button type="submit" className="btn btn-danger">Delete</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Delete;
