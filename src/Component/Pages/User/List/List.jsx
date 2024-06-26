import React, { useState, useEffect } from 'react';
import './List.css';
import { Link } from 'react-router-dom';

const List = () => {
    const [users, setUsers] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            const { token } = JSON.parse(storedUser);
            fetchUsers(token, 1); // Fetch users on component mount with page number 1
        }
    }, []);

    const fetchUsers = async (token, pageNumber) => {
        try {
            const url = `http://plantify.runasp.net/api/Dashboard/get-all-user-list?pageNumber=${pageNumber}`;

            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error('Failed to fetch users');
            }

            const data = await response.json();
            setUsers(data);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();

        if (searchQuery.trim() === '') {
            const storedUser = localStorage.getItem('user');
            if (storedUser) {
                const { token } = JSON.parse(storedUser);
                fetchUsers(token, 1); // Fetch all users if search query is empty
            }
        } else {
            // Filter users based on search query
            const filteredUsers = users.filter(user =>
                user.displayName.toLowerCase().includes(searchQuery.toLowerCase())
            );
            setUsers(filteredUsers);
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
                                        {user.image_name ? (
                                            <img src={user.image_name} alt={user.displayName} className="avatar-image" />
                                        ) : (
                                            <i className={`fa-fw ${user.avatar}`} />
                                        )}
                                    </div>
                                </td>
                                <td style={{ color: 'rgb(111, 107, 107)' }}>{user.displayName}</td>
                                <td style={{ color: 'rgb(111, 107, 107)' }}>{user.email}</td>
                                <td style={{ color: 'rgb(111, 107, 107)' }}>{user.role}</td>
                                <td>
                                    <div className="action-buttons">
                                        <Link className='action-edit btn btn-primary' to={`/EditUser/${user.id}`}>
                                            <i className="fa-solid fa-pen-to-square"></i>
                                        </Link>
                                        <Link to={`/DeleteUser/${user.id}`} className='action-delete btn btn-danger'>
                                            <i className="fa-regular fa-trash-can"></i>
                                        </Link>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <h2 className="mt-5 alert alert-warning">No users found</h2>
            )}
        </div>
    );
};

export default List;
