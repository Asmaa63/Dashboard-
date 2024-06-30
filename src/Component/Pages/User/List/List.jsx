import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import './List.css';

const List = () => {
    const [users, setUsers] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [showPopup, setShowPopup] = useState(false);
    const [userIdToDelete, setUserIdToDelete] = useState(null);
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const observer = useRef();

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            const { token } = JSON.parse(storedUser);
            fetchUsers(token, page); // Fetch users on component mount
        }
    }, [page]);

    const fetchUsers = async (token, pageNumber) => {
        setLoading(true);
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
            // Ensure user IDs are unique
            setUsers(prevUsers => [...prevUsers, ...data.filter(user => !prevUsers.some(prevUser => prevUser.id === user.id))]);
        } catch (error) {
            console.error('Error fetching users:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleSearchSubmit = async (e) => {
        e.preventDefault();
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            const { token } = JSON.parse(storedUser);
            setLoading(true);
            try {
    
                let url;
                if (searchQuery.trim() === '') {
                    // Fetch all users
                    url = `http://plantify.runasp.net/api/Dashboard/get-all-user-list?pageNumber=${page}`;
                    setLoading(true);
                } else {
                    // Fetch search results
                    url = `http://plantify.runasp.net/api/Dashboard/search-users?query=${searchQuery}&pageNumber=${page}`;
                }
    
                const response = await fetch(url, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                });
    
                if (!response.ok) {
                    throw new Error(searchQuery.trim() === '' ? 'Failed to fetch all users' : 'Failed to fetch search results');
                }
    
                const data = await response.json();
                setUsers(data); // Replace the current users with either all users or search results
            } catch (error) {
                console.error('Error fetching users:', error);
            } 
        }
    };
    
    const handleDeleteClick = (id) => {
        setUserIdToDelete(id);
        setShowPopup(true);
    };

    const confirmDeleteUser = async () => {
        console.log('User deleted:', userIdToDelete);
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            const { token } = JSON.parse(storedUser);
            try {
                const url = `http://plantify.runasp.net/api/Dashboard/delete-user?id=${userIdToDelete}`;
                const response = await fetch(url, {
                    method: 'DELETE',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                });

                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(`Failed to delete user: ${errorData.message}`);
                }

                // Remove the user from the local state
                setUsers(users.filter(user => user.id !== userIdToDelete));
                setShowPopup(false);
                setUserIdToDelete(null);

                setShowSuccessMessage(true);
                setTimeout(() => setShowSuccessMessage(false), 3000);
            } catch (error) {
                console.error('Error deleting user:', error.message);
            }
        }
    };

    const cancelDeleteUser = () => {
        setShowPopup(false);
        setUserIdToDelete(null);
    };

    const lastUserElementRef = useCallback(node => {
        if (loading) return;
        if (observer.current) observer.current.disconnect();
        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting) {
                setPage(prevPage => prevPage + 1);
            }
        });
        if (node) observer.current.observe(node);
    }, [loading]);

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
                        {users.map((user, index) => (
                            <tr key={user.id} ref={index === users.length - 1 ? lastUserElementRef : null}>
                                <td style={{ color: 'rgb(111, 107, 107)' }}>{user.id}</td>
                                <td style={{ textAlign: 'center' }}>
                                    <div className="image-container">
                                        {user.image_name ? (
                                            <img src={user.image_name} alt={user.displayName} className="image-image" />
                                        ) : (
                                            <i className={`fa-fw ${user.image}`} />
                                        )}
                                    </div>
                                </td>
                                <td style={{ color: 'rgb(111, 107, 107)' }}>{user.displayName}</td>
                                <td style={{ color: 'rgb(111, 107, 107)' }}>{user.email}</td>
                                <td style={{ color: 'rgb(111, 107, 107)' }}>{user.role}</td>
                                <td>
                                    <div className="action-buttons">
                                        <Link className='action-edit btn btn-primary' to={`/DashboardMain/EditUser/${user.id}`}>
                                            <i className="fa-solid fa-pen-to-square"></i>
                                        </Link>
                                        <button 
                                            className='action-delete btn btn-danger'
                                            onClick={() => handleDeleteClick(user.id)}
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
                <h2 className="mt-5 alert alert-warning">No users found</h2>
            )}
            {showPopup && (
                <div className="popup-overlay">
                    <div className="popup">
                        <h3>Are you sure you want to delete this user?</h3>
                        <div className="popup-buttons">
                            <button className="btn btn-danger" onClick={confirmDeleteUser}>Yes</button>
                            <button className="btn btn-secondary" onClick={cancelDeleteUser}>No</button>
                        </div>
                    </div>
                </div>
            )}
            {showSuccessMessage && (
                <div className="success-message">
                    <p>User deleted successfully!</p>
                </div>
            )}
            {loading }
        </div>
    );
};

export default List;
