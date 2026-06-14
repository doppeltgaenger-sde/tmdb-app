import { memo } from "react";
import { Link } from "react-router-dom";
import { Button } from "@shared";
import "./styles/FilmographyCell.scss";

export const FilmographyCell = memo(({ 
  id,
  mediaType = "movie",
  name, 
  date,
  roles,
  episodesCount,
}) => {
  const isSeries = mediaType === "tv" && episodesCount > 0;

  return (
    <div className="filmography-cell">
      <h3 className="filmography-cell__name">
        <Button 
          className="filmography-cell__name-button" 
          variant="ghost"
          theme="dark"
          aria-label={`${name}, ${date}. View details.`}
        >
          {name}
        </Button>
      </h3>

      <p className="filmography-cell__role">
        {roles}
      </p>

      {isSeries && 
        <Button 
          className="filmography-cell__episodes-button" 
          as={Link} 
          to={`/`}
          variant="ghost"
          theme="dark"
          aria-label={`${episodesCount} episodes of ${name}. View details.`}
        >
          {episodesCount} episodes
        </Button>
      }
    </div>
  );
});
