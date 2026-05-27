import { memo } from "react";
import { Link } from "react-router-dom";
import { Button, Icon, Average } from "@shared";
import "./styles/WideCard.scss";

const IMAGE_BASE = "https://media.themoviedb.org/t/p/w94_and_h141_face";
const IMAGE_BASE_2X = "https://media.themoviedb.org/t/p/w188_and_h282_face";

export const WideCard = memo(({ 
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
    <div className="wide-card">
      <div className="wide-card__poster">
        {showSkeleton ? (
          <Icon
            className="wide-card__placeholder"
            name="media-placeholder"
          />
        ) : (
          <img
            className="wide-card__poster-image"
            src={`${IMAGE_BASE}${posterPath}`}
            srcSet={`
              ${IMAGE_BASE}${posterPath} 1x,
              ${IMAGE_BASE_2X}${posterPath} 2x
            `}
            alt={name ? `${name} media poster` : "TMDB media poster"}
            loading={isPriority ? "eager" : "lazy"}
            fetchPriority={isPriority ? "high" : "low"}
            decoding={isPriority ? "sync" : "async"}
          />
        )}
      </div>

      <div className="wide-card__content">
        <div className="wide-card__title-block">
          <Average
            className="wide-card__average"
            value={voteAverage}
            isSkeleton={isSkeleton}
          />

          <h3 className="wide-card__name">
            <Button 
              className="wide-card__button" 
              as={Link} 
              to={linkTo}
              variant="ghost"
              theme="dark"
              aria-label={`${name}, ${date}. View details.`}
            >
              {name}
            </Button>
          </h3>

          <p className="wide-card__date">{date}</p>
        </div>

        <p className="wide-card__description">{description}</p>
      </div>
    </div>
  );
});
