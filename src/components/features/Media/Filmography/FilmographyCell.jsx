import { useState, memo } from "react";
import { MediaModal } from "@features";
import { Button } from "@shared";
import "./styles/FilmographyCell.scss";

export const FilmographyCell = memo(({ 
  id,
  mediaType = "movie",
  name, 
  date,
  roles,
  posterPath, 
  backdropPath,
  voteAverage,
  episodesCount,
  genreIds,
  description,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const isSeries = mediaType === "tv" && episodesCount > 0;

  const media = {
    id,
    mediaType,
    name,
    date,
    posterPath,
    backdropPath,
    voteAverage,
    episodesCount,
    description,
  };

  return (
    <div className="filmography-cell">
      <h3 className="filmography-cell__name">
        <Button 
          className="filmography-cell__name-button" 
          variant="ghost"
          theme="dark"
          onClick={() => setIsModalOpen(true)}
          aria-label={`${name}, ${date}. View details.`}
        >
          {name}
        </Button>
      </h3>

      <p className="filmography-cell__role">
        {roles}
      </p>

      {isSeries && 
        <p className="filmography-cell__episodes">{episodesCount} episodes</p>
      }

      <MediaModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        {...media}
      />
    </div>
  );
});
