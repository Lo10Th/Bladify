import { useNavigate } from "react-router-dom";
import "./searchresult.css";

export const SearchResult = ({ result }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/song/${result.id}`);
  };

  return (
    <div className="search-result" onClick={handleClick}>
      {result.title}
    </div>
  );
};
