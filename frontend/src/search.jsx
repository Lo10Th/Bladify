import React, { useState } from 'react';
import { NavLink } from 'react-router-dom'; // Importiere NavLink anstelle von Link

function Search() {
  const [inputValue, setInputValue] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleInputChange = (event) => {
    const newValue = event.target.value;
    setInputValue(newValue);
  };

  const searchSongs = () => {
    if (inputValue) {
      fetch(`http://localhost:5000/search/${inputValue}`)
        .then((response) => response.json())
        .then((data) => {
          setSearchResults(data);
        });
    }
  };

  return (
    <div>
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
      />
      <button onClick={searchSongs}>Search</button>
      <ul>
        {searchResults.map((song) => (
          <li key={song.id}>
            <NavLink to={`/song/${song.id}`}>{song.title} - {song.artist}</NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Search;
