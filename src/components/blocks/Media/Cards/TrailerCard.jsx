import { memo } from "react";
import { Icon } from "@shared";
import "./styles/TrailerCard.scss";

const IMAGE_BASE = "https://image.tmdb.org/t/p/w780";

export const TrailerCard = memo((props) => {
  const {
    name,
    description,
    backdrop_path,
    isSkeleton,
    onClick,
    onMouseEnter,
    ...trailerData
  } = props;

  const handleClick = () => {
    if (!isSkeleton && onClick) {
      onClick(trailerData);
    }
  };

  const handleMouseEnter = () => {
    if (!isSkeleton && onMouseEnter) {
      onMouseEnter(trailerData);
    }
  };

  const renderBackdrop = () => {
    const showSkeleton = isSkeleton || !backdrop_path;

    if (showSkeleton) {
      return (
        <Icon className="trailer-card__placeholder" name="media-placeholder" />
      );
    }

    return (
      <>
        <img
          className="trailer-card__backdrop-image"
          src={`${IMAGE_BASE}${backdrop_path}`}
          alt={`${name} || "tmdb trailer backdrop"`}
        />

        <Icon className="trailer-card__overlay" name="trailer-overlay" />
      </>
    );
  };

  return (
    <div
      className="trailer-card"
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
    >
      <div className="trailer-card__backdrop">{renderBackdrop()}</div>

      <div className="trailer-card__content">
        <h3 className="trailer-card__name">{name}</h3>
        <p className="trailer-card__description">{description}</p>
      </div>
    </div>
  );
});
