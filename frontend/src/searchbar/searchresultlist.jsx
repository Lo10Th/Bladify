import React from "react";
import { SearchResult } from "./searchresult";

import "./searchresultlist.css";

export const SearchResultsList = ({ results }) => {
  return (
    <div className="results-list">
      {results && results.length > 0 ? (
        <ul>
          {results.map((result) => (
            <SearchResult result={result.title} key={result.id} />
          ))}
        </ul>
      ) : (
        <p>No results found.</p>
      )}
    </div>
  );
}
