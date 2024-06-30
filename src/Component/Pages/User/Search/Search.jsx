import React, { useState } from 'react';
import axios from 'axios';
import './Search.css';

const SearchComponent = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [searchResult, setSearchResult] = useState([]);

    let cancel;

    const handleSearch = () => {
        if (cancel !== undefined) {
            cancel();  // Cancel the previous request if it exists
        }

        setIsLoading(true);

        axios.get(`your_search_endpoint?search=${searchTerm}`, {
            cancelToken: new axios.CancelToken(function executor(c) {
                cancel = c;  // Save the cancel function for the request
            })
        })
        .then(response => {
            setSearchResult(response.data);  // Store the search results
        })
        .catch(error => {
            console.error('Error fetching search results:', error);
        })
        .finally(() => {
            setIsLoading(false);
        });
    };

    const handleChange = (event) => {
        setSearchTerm(event.target.value);
    };

    return (
        <div className='searchcomp'>
            <input
                type="text"
                value={searchTerm}
                onChange={handleChange}
                placeholder="Search here..."
            />
            <button onClick={handleSearch} disabled={isLoading}>
                {isLoading ? 'Searching...' : 'Search'}
            </button>

            <div>
                {searchResult.length > 0 ? (
                    <ul>
                        {searchResult.map(item => (
                            <li key={item.id}>{item.name}</li>
                        ))}
                    </ul>
                ) : (
                    <p>No results found</p>
                )}
            </div>
        </div>
    );
};

export default SearchComponent;
