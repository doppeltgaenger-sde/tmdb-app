import { memo } from "react";
import { Link } from "react-router-dom";
import { classNames } from "@utils";
import { Button, Icon } from "@shared";
import "./styles/ProfileCard.scss";

const VARIANTS = {
  "fixed": "profile-card--fixed",
  "fluid": "profile-card--fluid",
};

const IMAGE_BASE = {
  fixed: {
    base: "https://media.themoviedb.org/t/p/w138_and_h175_face",
    base2x: "https://media.themoviedb.org/t/p/w276_and_h350_face",
  },
  fluid: {
    base: "https://media.themoviedb.org/t/p/w235_and_h235_face",
    base2x: "https://media.themoviedb.org/t/p/w470_and_h470_face",
  },
};

export const ProfileCard = memo(({ 
  variant = "fixed",
  name,
  character,
  jobs,
  profilePath,
  mediaList,
  isSkeleton,
  isPriority,
}) => {
  const showSkeleton = isSkeleton || !profilePath;
  const { base, base2x } = IMAGE_BASE[variant];

  return (
    <div
      className={classNames([
        "profile-card",
        VARIANTS[variant],
      ])}
    >
      <div className="profile-card__profile">
        {showSkeleton ? (
          <Icon
            className="profile-card__placeholder"
            name="profile-placeholder"
          />
        ) : (
          <img
            className="profile-card__profile-image"
            src={`${base}${profilePath}`}
            srcSet={`
              ${base}${profilePath} 1x,
              ${base2x}${profilePath} 2x
            `}
            alt={name ? `${name} profile` : "TMDB person profile"}
            loading={isPriority ? "eager" : "lazy"}
            fetchPriority={isPriority ? "high" : "low"}
            decoding={isPriority ? "sync" : "async"}
          />
        )}
      </div>

      <div className="profile-card__content">
        <h3 className="profile-card__name">
          <Button 
            className="profile-card__button" 
            as={Link} 
            to={`/`}
            variant="ghost"
            theme="dark"
            aria-label={`${name}. View profile.`}
          >
            {name}
          </Button>
        </h3>

        {(character || jobs) &&      
          <p className="profile-card__role">
            {character || jobs?.join(", ") || ""}
          </p>
        }

        {mediaList &&
          <p className="profile-card__media-list">
            {mediaList}
          </p>
        }
      </div>
    </div>
  );
});
