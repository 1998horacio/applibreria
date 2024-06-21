import React from 'react';

const SearchBar = ({ onSearch }) => {
  const handleChange = (e) => {
    onSearch(e.target.value);
  };

  return (
    <div>
      <input type="text" placeholder="Buscar..." onChange={handleChange} />
    </div>
  );
};

export default SearchBar;

