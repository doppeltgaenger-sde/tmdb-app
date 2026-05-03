import { memo } from "react";
import { Link } from "react-router-dom";
import { Button, Icon, Average } from "@shared";
import "./styles/PlateCard.scss";

const IMAGE_BASE = "https://media.themoviedb.org/t/p/w94_and_h141_face";
const IMAGE_BASE_2X = "https://media.themoviedb.org/t/p/w188_and_h282_face";

export const PlateCard = memo(({ 
  id,
  mediaType = "movie",
  posterPath, 
  name, 
  date, 
  voteAverage,
  description,
  isSkeleton,
  isPriority,
}) => {
  const showSkeleton = isSkeleton || !posterPath;
  const linkTo = `/${mediaType}/${id}`;

  return (
    <div className="plate-card">
      <div className="plate-card__poster">
        {showSkeleton ? (
          <Icon
            className="plate-card__placeholder"
            name="media-placeholder"
          />
        ) : (
          <img
            className="plate-card__poster-image"
            src={`${IMAGE_BASE}${posterPath}`}
            srcSet={`
              ${IMAGE_BASE}${posterPath} 1x,
              ${IMAGE_BASE_2X}${posterPath} 2x
            `}
            alt={name ? `${name} media poster` : "tmdb media poster"}
            loading={isPriority ? "eager" : "lazy"}
            fetchPriority={isPriority ? "high" : "low"}
            decoding={isPriority ? "sync" : "async"}
          />
        )}
      </div>

      <div className="plate-card__content">
        <div className="plate-card__title-block">
          <Average
            className="plate-card__average"
            value={voteAverage}
            isSkeleton={isSkeleton}
          />

          <h3 className="plate-card__name">
            <Button 
              className="plate-card__button" 
              as={Link} 
              to={linkTo}
              variant="ghost"
              theme="dark"
              aria-label={`${name}, ${date}. View details.`}
            >
              {name}
            </Button>
          </h3>

          <p className="plate-card__date">{date}</p>
        </div>

        <p className="plate-card__description">{description}</p>
      </div>
    </div>
  );
});
