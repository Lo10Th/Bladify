import { useState } from "react";
import "./search.css";
import { SearchBar } from "./searchbar/searchbar.jsx";
import { SearchResultsList } from "./searchbar/searchresultlist.jsx";

function Search() {
  const [results, setResults] = useState([]);

  const fetchData = (value) => {
    if (value) {
      fetch(`http://localhost:5000/search/${value}`)
        .then((response) => response.json())
        .then((data) => {
          setResults(data);
        });
    }
  };

  return (
    <div className="Search">
      <div className="search-bar-container">
        <SearchBar setResults={setResults} />
        {results && results.length > 0 && (
          <SearchResultsList results={results} />
        )}
      </div>
    </div>
  );
}

export default Search;
