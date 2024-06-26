import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const ListAdmin = () => {
    const [users, setUsers] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        // Load mock users initially
        fetchMockUsers();
    }, []);

    const fetchMockUsers = () => {
        // Mock data
        const mockUsers = [
            { id: 14666666666666666666, displayName: 'aya', email: 'aya@example.com', role: 'Admin', avatar: 'fa-solid fa-user' },
            { id: 2, displayName: 'arwa', email: 'arwa@example.com', role: 'Admin', avatar: 'fa-solid fa-user' },
            { id: 3, displayName: 'omnia', email: 'omnia@example.com', role: 'Admin', avatar: 'fa-solid fa-user' },
            { id: 4, displayName: 'eman', email: 'eman@example.com', role: 'Admin', avatar: 'fa-solid fa-user' },
            // Add more mock users as needed
        ];
        setUsers(mockUsers);
    };

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();

        // If search query is empty, fetch all users
        if (searchQuery.trim() === '') {
            fetchMockUsers();
        } else {
            // Filter mock data based on search query
            setUsers((prevUsers) =>
                prevUsers.filter(user =>
                    user.displayName.toLowerCase().includes(searchQuery.toLowerCase())
                )
            );
        }
    };

    return (
        <div id="admin" className="admin-container">
            <h2 style={{ backgroundColor: 'deeppink' }}>Users List</h2>
            <form className="search-form" onSubmit={handleSearchSubmit}>
                <input 
                    type="text" 
                    className="form-control search-input" 
                    name="username" 
                    placeholder="Enter The user Name" 
                    value={searchQuery}
                    onChange={handleSearchChange}
                />
                <input type="submit" value="Search" className="btn btn-success search-button" />
            </form>
            <br />
            <br />
            {users.length > 0 ? (
                <table id="admin-table" className="admin-table">
                    <thead className="ahead">
                        <tr>
                            <th>Id</th>
                            <th>Image</th>
                            <th>DisplayName</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody id="admin-table-body" className="bad">
                        {users.map((user) => (
                            <tr key={user.id}>
                                <td style={{ color: 'rgb(111, 107, 107)' }}>{user.id}</td>
                                <td style={{ textAlign: 'center' }}>
                                    <div className="avatar-container">
                                        <i className={`fa-fw ${user.avatar}`} />
                                    </div>
                                </td>
                                <td style={{ color: 'rgb(111, 107, 107)' }}>{user.displayName}</td>
                                <td style={{ color: 'rgb(111, 107, 107)' }}>{user.email}</td>
                                <td style={{ color: 'rgb(111, 107, 107)' }}>{user.role}</td>
                                <td>
                                    {/* Mock action button */}
                                    <div className="action-buttons">
                                        <Link className='action-edit btn btn-primary' to="/EditAdmin">
                                            <i className="fa-solid fa-pen-to-square"></i>
                                        </Link>
                                        <Link to="/DeleteUser" className='action-delete btn btn-danger'>
                                            <i className="fa-regular fa-trash-can"></i>
                                        </Link>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <h2 className="mt-5 alert alert-warning">There is Not Any User</h2>
            )}
        </div>
    );
};

export default ListAdmin;
