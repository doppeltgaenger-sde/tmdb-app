import { memo } from "react";
import { Link } from "react-router-dom";
import { Button, Average, Icon } from "@shared";
import "./styles/BackdropCard.scss";

const IMAGE_BASE = "https://media.themoviedb.org/t/p/w250_and_h141_face";
const IMAGE_BASE_2X = "https://media.themoviedb.org/t/p/w500_and_h282_face";

export const BackdropCard = memo(({ 
  id,
  mediaType = "movie",
  name, 
  backdropPath, 
  date, 
  voteAverage, 
  isSkeleton,
  isPriority,
}) => {
  const showSkeleton = isSkeleton || !backdropPath;
  const linkTo = `/${mediaType}/${id}`;

  return (
    <div className="backdrop-card">
      <div className="backdrop-card__backdrop">
        {showSkeleton ? (
          <Icon
            className="backdrop-card__placeholder"
            name="media-placeholder"
          />
        ) : (
          <img
            className="backdrop-card__backdrop-image"
            src={`${IMAGE_BASE}${backdropPath}`}
            srcSet={`
              ${IMAGE_BASE}${backdropPath} 1x,
              ${IMAGE_BASE_2X}${backdropPath} 2x
            `}
            alt={name ? `${name} movie poster` : "tmdb movie poster"}
            loading={isPriority ? "eager" : "lazy"}
            fetchPriority={isPriority ? "high" : "low"}
            decoding={isPriority ? "sync" : "async"}
          />
        )}
      </div>

      <div className="backdrop-card__content">
        <h3 className="backdrop-card__name">
          <Button 
            className="backdrop-card__button" 
            as={Link} 
            to={linkTo}
            variant="ghost"
            theme="dark"
            aria-label={`${name}, ${date}. View details.`}
          >
            {name}
          </Button>
        </h3>

        <p className="backdrop-card__date">
          {isSkeleton ? "" : date}
        </p>

        <Average
          className="backdrop-card__average"
          value={voteAverage}
          isSkeleton={isSkeleton}
        />
      </div>
    </div>
  );
});
