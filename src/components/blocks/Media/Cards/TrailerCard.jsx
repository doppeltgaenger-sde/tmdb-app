import { memo, useCallback } from "react";
import { Icon } from "@shared";
import "./styles/TrailerCard.scss";

const IMAGE_BASE = "https://image.tmdb.org/t/p/w355_and_h200_multi_faces";
const IMAGE_BASE_2X = "https://image.tmdb.org/t/p/w710_and_h400_multi_faces";

export const TrailerCard = memo(({
  name,
  description,
  backdropPath,
  isSkeleton,
  onClick,
  onMouseEnter,
  isPriority,
  ...trailerData
}) => {
  const handleClick = useCallback(() => {
    if (!isSkeleton && onClick) {
      onClick(trailerData);
    }
  }, [isSkeleton, onClick, trailerData]);

  const handleMouseEnter = () => {
    if (!isSkeleton && onMouseEnter) {
      onMouseEnter(trailerData);
    }
  };

  const renderBackdrop = () => {
    const showSkeleton = isSkeleton || !backdropPath;

    if (showSkeleton) {
      return (
        <Icon
          className="trailer-card__placeholder-icon"
          name="media-placeholder"
        />
      );
    }

    return (
      <>
        <img
          className="trailer-card__backdrop-image"
          src={`${IMAGE_BASE}${backdropPath}`}
          srcSet={`
            ${IMAGE_BASE}${backdropPath} 1x,
            ${IMAGE_BASE_2X}${backdropPath} 2x
          `}
          alt={name ? `${name} trailer backdrop` : "tmdb trailer backdrop"}
          loading={isPriority ? "eager" : "lazy"}
          fetchPriority={isPriority ? "high" : "low"}
          decoding={isPriority ? "sync" : "async"}
        />

        <Icon className="trailer-card__play-icon" name="play-overlay" />
      </>
    );
  };

  return (
    <div
      className="trailer-card"
      onMouseEnter={handleMouseEnter}
      onClick={handleClick}
    >
      <div className="trailer-card__backdrop">{renderBackdrop()}</div>

      <div className="trailer-card__content">
        <h3 className="trailer-card__name">{name}</h3>
        <p className="trailer-card__description">{description}</p>
      </div>
    </div>
  );
});
