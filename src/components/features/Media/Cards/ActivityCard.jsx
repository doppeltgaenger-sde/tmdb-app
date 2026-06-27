import { memo } from "react";
import { Link } from "react-router-dom";
import { Button, Icon } from "@shared";
import "./styles/ActivityCard.scss";

const IMAGE_BASE = {
  media: {
    base: "https://media.themoviedb.org/t/p/w250_and_h141_face",
    base2x: "https://media.themoviedb.org/t/p/w500_and_h282_face",
  },
  profile: {
    base: "https://media.themoviedb.org/t/p/w250_and_h141_face_filter(moderate,nudity,96)",
    base2x: "https://media.themoviedb.org/t/p/w500_and_h282_face_filter(moderate,nudity,96)",
  },
};

export const ActivityCard = memo(({ 
  id,
  activityType = "movie",
  name, 
  mediaPath, 
  date, 
  editsCount,
  isPriority,
}) => {
  const showSkeleton = !mediaPath;
  const linkTo = `/${activityType}/${id}`;
  const isProfile = activityType === "person";
  const variant = isProfile ? "profile" : "media";
  const { base, base2x } = IMAGE_BASE[variant];

  return (
    <div className="activity-card">
      <div className="activity-card__media">
        {showSkeleton ? (
          <Icon
            className="activity-card__placeholder"
            name={isProfile ? "profile-placeholder" : "media-placeholder"}
          />
        ) : (
          <img
            className="activity-card__media-image"
            src={`${base}${mediaPath}`}
            srcSet={`
              ${base}${mediaPath} 1x,
              ${base2x}${mediaPath} 2x
            `}
            alt={
              isProfile 
                ? `${name} profile` 
                : `${name} media backdrop` 
            }
            loading={isPriority ? "eager" : "lazy"}
            fetchPriority={isPriority ? "high" : "low"}
            decoding={isPriority ? "sync" : "async"}
          />
        )}
      </div>

      <div className="activity-card__content">
        <h3 className="activity-card__name">
          <Button 
            className="activity-card__button" 
            as={Link} 
            to={linkTo}
            variant="ghost"
            theme="dark"
            aria-label={
              isProfile
                ? `${name}. View profile.`
                : `${name}, ${date}. View details.`
            }
          >
            {name}
          </Button>
        </h3>

        <div className="activity-card__attractions">
          <p className="activity-card__date">
            {date}
          </p>

          <p className="activity-card__edits">
            {editsCount || 0} edits
          </p>
        </div>
      </div>
    </div>
  );
});
