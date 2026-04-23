import { Link } from "react-router-dom";
import { classNames } from "@utils";
import { Button } from "@shared";
import "./styles/StatsCard.scss";

const IMAGE_BASE = "https://media.themoviedb.org/t/p/h30";
const IMAGE_BASE_2X = "https://media.themoviedb.org/t/p/h60";

export const StatsCard = ({ label, value }) => {
  const values = Array.isArray(value) ? value : (value ? [value] : []);

  if (values.length === 0) return null;

  const hasLogos = values.some(item => typeof item === "object");

  return (
    <div className="stats-card">
      <p className="stats-card__label">{label}</p>
      <div
        className={classNames([
          "stats-card__values", 
          hasLogos && "stats-card__values--logo"
        ])}
      >
        {values.map((item, index) => renderContent(item, index))}
      </div>
    </div>
  );
};

const renderContent = (item, index, array) => {
  const isNetwork = typeof item === "object" && item !== null;

  if (isNetwork) {
    return (
      <Button
      className="stats-card__button"
        key={item.id || index}
        as={Link}
        to={`/`} 
        variant="ghost"
        aria-label={`${item.name}. View details.`}
      >
        {item.logo_path ? (
          <img
            className="stats-card__logo"
            src={`${IMAGE_BASE}${item.logo_path}`}
            srcSet={`
              ${IMAGE_BASE}${item.logo_path} 1x,
              ${IMAGE_BASE_2X}${item.logo_path} 2x
            `}
            alt={item.name ? `${item.name} network logo` : "tmdb network logo"}
            loading="lazy"
            fetchPriority="low"
            decoding="async"
          />
        ) : (
          <>         
            {item.name}
            {index < array.length - 1 && ", "}
          </>
        )}
      </Button>
    );
  }

  return (
    <p key={index} className="stats-card__value">
      {item}
    </p>
  );
};
