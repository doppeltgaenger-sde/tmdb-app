import { memo } from "react";
import { formatDate } from "@utils";
import { Average, Icon } from "@shared";
import "./styles/PosterCard.scss";

const IMAGE_BASE = "https://image.tmdb.org/t/p/w500";

export const PosterCard = memo((props) => {
  const { 
    name, 
    poster_path, 
    date, 
    vote_average, 
    isSkeleton,
  } = props;

  const showSkeleton = isSkeleton || !poster_path;

  return (
    <div className="poster-card">
      <div className="poster-card__poster">
        {showSkeleton ? (
          <Icon className="poster-card__placeholder" name="media-placeholder" />
        ) : (
          <img
            className="poster-card__poster-image"
            src={`${IMAGE_BASE}${poster_path}`}
            alt={`${name} || "tmdb film poster"`}
          />
        )}
      </div>

      <div className="poster-card__content">
        <h3 className="poster-card__name">{name}</h3>

        <p className="poster-card__date">
          {isSkeleton ? "" : formatDate(date)}
        </p>

        <Average
          className="poster-card__average"
          value={vote_average}
          isSkeleton={isSkeleton}
        />
      </div>
    </div>
  );
});
