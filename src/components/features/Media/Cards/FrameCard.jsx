import { memo, useCallback } from "react";
import { classNames } from "@utils";
import { Icon } from "@shared";
import "./styles/FrameCard.scss";

const MEDIA_CONFIG = {
  video: {
    className: "frame-card--video",
    getBase: (data) => data.videoPreview,
    showPlayIcon: true,
  },
  backdrop: {
    className: "frame-card--backdrop",
    getBase: (data) => `https://media.themoviedb.org/t/p/w533_and_h300_face${data.backdropPath}`,
    getBase2x: (data) => `https://media.themoviedb.org/t/p/w1066_and_h600_face${data.backdropPath}`,
    showPlayIcon: false,
  },
  poster: {
    className: "frame-card--poster",
    getBase: (data) => `https://media.themoviedb.org/t/p/w342${data.posterPath}`,
    getBase2x: (data) => `https://media.themoviedb.org/t/p/w780${data.posterPath}`,
    showPlayIcon: false,
  }
};

export const FrameCard = memo(({
  variant,
  name,
  isSkeleton,
  isPriority,
  onClick,
  ...itemData
}) => {  
  const config = MEDIA_CONFIG[variant] || MEDIA_CONFIG.backdrop;
  
  const showSkeleton = isSkeleton || (
    !itemData.videoPreview && 
    !itemData.backdropPath && 
    !itemData.posterPath
  );

  const handleClick = useCallback(() => {
    if (!isSkeleton && onClick) {
      onClick(itemData);
    }
  }, [isSkeleton, onClick, itemData]);

  const src1x = config.getBase(itemData);
  const src2x = config.getBase2x ? config.getBase2x(itemData) : src1x;

  return (
    <div 
      className={classNames([
        "frame-card", 
        config.className
      ])}
      onClick={handleClick}
    >
      {showSkeleton ? (
        <Icon className="frame-card__placeholder-icon" name="media-placeholder" />
      ) : (
        <>
          <img
            className="frame-card__image"
            src={src1x}
            srcSet={config.getBase2x ? `${src1x} 1x, ${src2x} 2x` : undefined}
            alt={name ? `${name} media content` : "tmdb media content"}
            loading={isPriority ? "eager" : "lazy"}
            fetchPriority={isPriority ? "high" : "low"}
            decoding={isPriority ? "sync" : "async"}
          />

          {config.showPlayIcon && (
            <Icon className="frame-card__play-icon" name="play-overlay" />
          )}
        </>
      )}
    </div>
  );
});
