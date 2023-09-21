import React from "react";
import { SearchResult } from "./searchresult";

import "./searchresultlist.css";

export const SearchResultsList = ({ results }) => {
  return (
    <div className="results-list">
      {results.map((result) => (
        <SearchResult result={result} key={result.id} />
      ))}
    </div>
  );
};
