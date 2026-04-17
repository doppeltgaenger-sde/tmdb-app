import { memo } from "react";
import { Link } from "react-router-dom";
import { Button, Average, Icon } from "@shared";
import "./styles/PosterCard.scss";

const IMAGE_BASE = "https://image.tmdb.org/t/p/w220_and_h330_face";
const IMAGE_BASE_2X = "https://image.tmdb.org/t/p/w440_and_h660_face";

export const PosterCard = memo(({ 
  id,
  media_type = "movie",
  name, 
  posterPath, 
  date, 
  vote_average, 
  isSkeleton,
}) => {
  const showSkeleton = isSkeleton || !posterPath;
  const linkTo = `/${media_type}/${id}`;

  return (
    <div className="poster-card">
      <div className="poster-card__poster">
        {showSkeleton ? (
          <Icon
            className="poster-card__placeholder"
            name="media-placeholder"
          />
        ) : (
          <img
            className="poster-card__poster-image"
            src={`${IMAGE_BASE}${posterPath}`}
            srcSet={`
              ${IMAGE_BASE}${posterPath} 1x,
              ${IMAGE_BASE_2X}${posterPath} 2x
            `}
            alt={name ? `${name} film poster` : "tmdb film poster"}
            loading="lazy"
          />
        )}
      </div>

      <div className="poster-card__content">
        <h3 className="poster-card__name">
          <Button 
            className="poster-card__button" 
            as={Link} 
            to={linkTo}
            variant="overlay"
            theme="dark"
            aria-label={`${name}, ${date}. View details.`}
          >
            {name}
          </Button>
        </h3>

        <p className="poster-card__date">
          {isSkeleton ? "" : date}
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
