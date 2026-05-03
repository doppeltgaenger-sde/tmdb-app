import { Link } from "react-router-dom";
import { classNames } from "@utils";
import { Button } from "@shared";
import "./styles/StatsCard.scss";

const IMAGE_BASE = "https://media.themoviedb.org/t/p/h30";
const IMAGE_BASE_2X = "https://media.themoviedb.org/t/p/h60";

export const StatsCard = ({ label, value }) => {
  const items = Array.isArray(value) ? value : (value ? [value] : []);
  const firstItem = items[0];

  if (!firstItem) return null;

  const isProvider = typeof firstItem === "object" && firstItem !== null;
  const hasLogo = isProvider && !!firstItem.logo_path;

  return (
    <div className="stats-card">
      <p className="stats-card__label">{label}</p>
      <div
        className={classNames([
          "stats-card__values",
          hasLogo && "stats-card__values--logo"
        ])}
      >
        {isProvider ? (
          <Button
            className="stats-card__button"
            as={Link}
            to={`/`}
            variant="ghost"
            aria-label={`${firstItem.name}. View details.`}
          >
            {firstItem.logo_path ? (
              <img
                className="stats-card__logo"
                src={`${IMAGE_BASE}${firstItem.logo_path}`}
                srcSet={`
                  ${IMAGE_BASE}${firstItem.logo_path} 1x,
                  ${IMAGE_BASE_2X}${firstItem.logo_path} 2x
                `}
                alt={firstItem.name ? `${firstItem.name} logo` : "logo"}
                loading="lazy"
                fetchPriority="low"
                decoding="async"
              />
            ) : (
              firstItem.name
            )}
          </Button>
        ) : (
          <p className="stats-card__value">{String(firstItem)}</p>
        )}
      </div>
    </div>
  );
};
