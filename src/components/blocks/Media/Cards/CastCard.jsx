import { memo } from "react";
import { Link } from "react-router-dom";
import { Button, Icon } from "@shared";
import "./styles/CastCard.scss";

const IMAGE_BASE = "https://media.themoviedb.org/t/p/w138_and_h175_face";
const IMAGE_BASE_2X = "https://media.themoviedb.org/t/p/w276_and_h350_face";

export const CastCard = memo(({ 
  name,
  character,
  profilePath,
  isSkeleton,
  isPriority,
}) => {
  const showSkeleton = isSkeleton || !profilePath;

  return (
    <div className="cast-card">
      <div className="cast-card__profile">
        {showSkeleton ? (
          <Icon
            className="cast-card__placeholder"
            name="cast-placeholder"
          />
        ) : (
          <img
            className="cast-card__profile-image"
            src={`${IMAGE_BASE}${profilePath}`}
            srcSet={`
              ${IMAGE_BASE}${profilePath} 1x,
              ${IMAGE_BASE_2X}${profilePath} 2x
            `}
            alt={name ? `${name} profile` : "tmdb actor profile"}
            loading={isPriority ? "eager" : "lazy"}
            fetchPriority={isPriority ? "high" : "low"}
            decoding={isPriority ? "sync" : "async"}
          />
        )}
      </div>

      <div className="cast-card__content">
        <h3 className="cast-card__name">
          <Button 
            className="cast-card__button" 
            as={Link} 
            to={`/`}
            variant="overlay"
            theme="dark"
            aria-label={`${name}. View profile.`}
          >
            {name}
          </Button>
        </h3>

        <p className="cast-card__character">
          {character}
        </p>
      </div>
    </div>
  );
});
