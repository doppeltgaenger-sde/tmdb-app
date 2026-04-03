import { memo } from "react";
import { formatDate } from "@utils";
import { Average, Icon } from "@shared";
import "./styles/PosterCard.scss";

const IMAGE_BASE = "https://image.tmdb.org/t/p/w220_and_h330_face";
const IMAGE_BASE_2X = "https://image.tmdb.org/t/p/w440_and_h660_face";

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
            srcSet={`
              ${IMAGE_BASE}${poster_path} 1x,
              ${IMAGE_BASE_2X}${poster_path} 2x
            `}
            alt={name 
              ? `${name} film poster` 
              : "tmdb film poster"
            }
            loading="lazy"
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
