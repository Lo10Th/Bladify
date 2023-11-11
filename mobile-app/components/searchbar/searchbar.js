import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import "./SearchBar.css";

export const SearchBar = ({ setResults }) => {
  const [input, setInput] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  
  const fetchData = (value) => {
    if (value) {
      fetch(`http://localhost:5000/search/${value}`)
        .then((response) => response.json())
        .then((data) => {
          // Verwende setResults, um die Ergebnisse zu aktualisieren
          setResults(data);
          setSearchResults(data);
        });
    }
  };

  const handleChange = (event) => {
    const value = event.target.value;
    setInput(value);
    fetchData(value);
  };

  return (
    <div className="input-wrapper">
      <FaSearch id="search-icon" />
      <input
        type="text"
        placeholder="What music you wanna listen today..."
        value={input}
        onChange={handleChange}
      />
    </div>
  );
};
