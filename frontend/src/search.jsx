import { useState } from "react";

import "./search.css";
import { SearchBar } from "./searchbar/searchbar.jsx";
import { SearchResultsList } from "./searchbar/searchresultlist.jsx";

function Search() {
  const [results, setResults] = useState([]);

  return (
    <div className="Search">
      <div className="search-bar-container">
        <SearchBar setResults={setResults} />
        {results && results.length > 0 && <SearchResultsList results={results} />}
      </div>
    </div>
  );
}

export default Search;