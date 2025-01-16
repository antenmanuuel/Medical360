import React, { useState } from 'react';

const SearchBar = ({ onSearch }) => {
    const [searchTerm, setSearchTerm] = useState('');

    const handleChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        onSearch(searchTerm);
    };

    return (
        <div className="max-w-full">
            <form
                onSubmit={handleSubmit}
                className="flex items-center bg-white py-2 px-4 border border-gray-200 rounded-full shadow-sm"
            >
                {/* Search Input */}
                <input
                    data-cy="search-bar"
                    type="text"
                    value={searchTerm}
                    onChange={handleChange}
                    placeholder="Search by name, email, or room..."
                    className="flex-grow text-sm text-gray-700 px-2 py-1 rounded-l-full border-none focus:outline-none"
                />

                {/* Search Button */}
                <button
                    type="submit"
                    data-cy="search-button"
                    className="ml-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-6 py-2 rounded-full shadow-md hover:from-blue-600 hover:to-indigo-700 transition"
                >
                    Search
                </button>
            </form>
        </div>
    );
};

export default SearchBar;
