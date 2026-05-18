import { Link } from "react-router-dom";
import { classNames } from "@utils";
import { Button } from "@shared";
import "./styles/StatsCard.scss";

const IMAGE_BASE = "https://media.themoviedb.org/t/p/h30";
const IMAGE_BASE_2X = "https://media.themoviedb.org/t/p/h60";

export const StatsCard = ({ label, value }) => {
  const items = Array.isArray(value) ? value : (value ? [value] : []);

  if (!items.length) return null;

  const isProvider = typeof items[0] === "object" && items[0] !== null;

  return (
    <div className="stats-card">
      <p className="stats-card__label">{label}</p>
      <div
        className={classNames([
          "stats-card__values",
          isProvider && "stats-card__values--providers"
        ])}
      >
        {isProvider ? (
          items.map((item) => (
            <Button
              key={item.id}
              className="stats-card__button"
              as={Link}
              to={`/${item.mediaType}/${item.id}`}
              variant="ghost"
              aria-label={`${item.name}. View details.`}
            >
              {item.logoPath ? (
                <img
                  className="stats-card__provider"
                  src={`${IMAGE_BASE}${item.logoPath}`}
                  srcSet={`
                    ${IMAGE_BASE}${item.logoPath} 1x,
                    ${IMAGE_BASE_2X}${item.logoPath} 2x
                  `}
                  alt={`${item.name} logo`}
                  loading="lazy"
                  fetchPriority="low"
                  decoding="async"
                />
              ) : (
                item.name
              )}
            </Button>
          ))
        ) : (
          items.map((str, index) => (
            <p key={index} className="stats-card__value">
              {String(str)}
            </p>
          ))
        )}
      </div>
    </div>
  );
};
