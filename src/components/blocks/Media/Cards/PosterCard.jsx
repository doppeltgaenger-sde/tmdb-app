import { memo } from "react";
import { Average, Icon } from "@shared";
import "./styles/PosterCard.scss";

const IMAGE_BASE = "https://image.tmdb.org/t/p/w220_and_h330_face";
const IMAGE_BASE_2X = "https://image.tmdb.org/t/p/w440_and_h660_face";

export const PosterCard = memo(({ 
  name, 
  posterPath, 
  date, 
  vote_average, 
  isSkeleton 
}) => {
  const showSkeleton = isSkeleton || !posterPath;

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
        <h3 className="poster-card__name">{name}</h3>

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
