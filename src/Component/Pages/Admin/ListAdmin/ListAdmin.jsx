import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const ListAdmin = () => {
    const [admins, setAdmins] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            const { token } = JSON.parse(storedUser);
            fetchAdmins(token, 1); // Fetch admins on component mount with page number 1
        }
    }, []);

    const fetchAdmins = async (token, pageNumber) => {
        try {
            const url = `http://plantify.runasp.net/api/Dashboard/get-all-admin-list?pageNumber=${pageNumber}`;

            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error('Failed to fetch admins');
            }

            const data = await response.json();
            setAdmins(data);
        } catch (error) {
            console.error('Error fetching admins:', error);
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
                fetchAdmins(token, 1); // Fetch all admins if search query is empty
            }
        } else {
            // Filter admins based on search query
            const filteredAdmins = admins.filter(admin =>
                admin.displayName.toLowerCase().includes(searchQuery.toLowerCase())
            );
            setAdmins(filteredAdmins);
        }
    };

    return (
        <div id="admin" className="admin-container">
            <h2 style={{ backgroundColor: 'deeppink' }}>Admins List</h2>
            <form className="search-form" onSubmit={handleSearchSubmit}>
                <input 
                    type="text" 
                    className="form-control search-input" 
                    name="username" 
                    placeholder="Enter The Admin Name" 
                    value={searchQuery}
                    onChange={handleSearchChange}
                />
                <input type="submit" value="Search" className="btn btn-success search-button" />
            </form>
            <br />
            <br />
            {admins.length > 0 ? (
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
                        {admins.map((admin) => (
                            <tr key={admin.id}>
                                <td style={{ color: 'rgb(111, 107, 107)' }}>{admin.id}</td>
                                <td style={{ textAlign: 'center' }}>
                                    <div className="avatar-container">
                                        {/* Assuming you have an image_name property for admin */}
                                        {admin.image_name ? (
                                            <img src={admin.image_name} alt={admin.displayName} className="avatar-image" />
                                        ) : (
                                            <i className={`fa-fw ${admin.avatar}`} />
                                        )}
                                    </div>
                                </td>
                                <td style={{ color: 'rgb(111, 107, 107)' }}>{admin.displayName}</td>
                                <td style={{ color: 'rgb(111, 107, 107)' }}>{admin.email}</td>
                                <td style={{ color: 'rgb(111, 107, 107)' }}>{admin.role}</td>
                                <td>
                                    <div className="action-buttons">
                                        {/* Replace these with actual links */}
                                        <Link className='action-edit btn btn-primary' to={`/EditAdmin/${admin.id}`}>
                                            <i className="fa-solid fa-pen-to-square"></i>
                                        </Link>
                                        <Link to={`/DeleteAdmin/${admin.id}`} className='action-delete btn btn-danger'>
                                            <i className="fa-regular fa-trash-can"></i>
                                        </Link>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <h2 className="mt-5 alert alert-warning">No admins found</h2>
            )}
        </div>
    );
};

export default ListAdmin;
