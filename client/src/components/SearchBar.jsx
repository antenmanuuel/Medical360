import React, { useState } from 'react';

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Search term:', searchTerm);
    
    // search logic:
  };

  return (
    <div className="max-w-lg mx-auto">
      <form onSubmit={handleSubmit} className="flex items-center justify-between bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm">
        <input
          type="text"
          value={searchTerm}
          onChange={handleChange}
          placeholder="Search..."
          className="flex-grow h-full px-2 py-1 text-sm border-none focus:outline-none"
        />
        <button type="submit" className="ml-2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none">Search</button>
      </form>
    </div>
  );
};

export default SearchBar;