import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../../User/List/List.css';

const ListAdmin = () => {
    const [admins, setAdmins] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [showPopup, setShowPopup] = useState(false);
    const [adminIdToDelete, setAdminIdToDelete] = useState(null);
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);

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

    const handleDeleteClick = (id) => {
        setAdminIdToDelete(id);
        setShowPopup(true);
    };

    const confirmDeleteAdmin = async () => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            const { token } = JSON.parse(storedUser);
            try {
                const url = `http://plantify.runasp.net/api/Dashboard/delete-admin?id=${adminIdToDelete}`;
                const response = await fetch(url, {
                    method: 'DELETE',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                });

                if (!response.ok) {
                    throw new Error('Failed to delete admin');
                }

                setAdmins(admins.filter(admin => admin.id !== adminIdToDelete));
                setShowPopup(false);
                setAdminIdToDelete(null);

                etShowSuccessMessage(true);
                setTimeout(() => setShowSuccessMessage(false), 2000);
            } catch (error) {
                console.error('Error deleting admin:', error);
            }
        }
    };

    const cancelDeleteAdmin = () => {
        setShowPopup(false);
        setAdminIdToDelete(null);
    };

    const handleCreateSuccess = (newAdmin) => {
        setAdmins([...admins, newAdmin]);
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
                                    <div className="image-container">
                                        {admin.image_name ? (
                                            <img src={admin.image_name} alt={admin.displayName} className="image-image" />
                                        ) : (
                                            <i className={`fa-fw ${admin.image}`} />
                                        )}
                                    </div>
                                </td>
                                <td style={{ color: 'rgb(111, 107, 107)' }}>{admin.displayName}</td>
                                <td style={{ color: 'rgb(111, 107, 107)' }}>{admin.email}</td>
                                <td style={{ color: 'rgb(111, 107, 107)' }}>{admin.role}</td>
                                <td>
                                    <div className="action-buttons">
                                        <Link className='action-edit btn btn-primary' to={`/EditAdmin/${admin.id}`}>
                                            <i className="fa-solid fa-pen-to-square"></i>
                                        </Link>
                                        <button 
                                            className='action-delete btn btn-danger'
                                            onClick={() => handleDeleteClick(admin.id)}
                                        >
                                            <i className="fa-regular fa-trash-can"></i>
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <h2 className="mt-5 alert alert-warning">No admins found</h2>
            )}
            {showPopup && (
                <div className="popup-overlay">
                    <div className="popup">
                        <h3>Are you sure you want to delete this admin?</h3>
                        <div className="popup-buttons">
                            <button className="btn btn-danger" onClick={confirmDeleteAdmin}>Yes</button>
                            <button className="btn btn-secondary" onClick={cancelDeleteAdmin}>No</button>
                        </div>
                    </div>
                </div>
            )}
            {showSuccessMessage && (
                <div className="success-message">
                    Admin deleted successfully!
                </div>
            )}
        </div>
    );
};

export default ListAdmin;
