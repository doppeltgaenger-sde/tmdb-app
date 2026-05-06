import { Link } from "react-router-dom";
import { classNames } from "@utils";
import { Button } from "@shared";
import "./styles/DetailsMeta.scss";

export const DetailsMeta = ({
  className,
  certification,
  date,
  country,
  genres,
  runtime,
  theme,
}) => {
  const hasMeta = certification || date || genres || runtime;

  if (!hasMeta) return null;

  return (
    <div className={classNames(["details-meta", className])}>
      {(certification || date) && 
        <span className="details-meta__item details-meta__item--release-date">
          {certification && 
            <span className="details-meta__certification">{certification}</span>
          }

          {date && 
            <span className="details-meta__date">
              {date}
              {country && ` (${country})`}
            </span>
          }
        </span>
      }

      {runtime && 
        <span className="details-meta__item details-meta__item--runtime">
          {runtime}
        </span>
      }

      {genres && 
        <span className="details-meta__item details-meta__item--genres">
          {genres.map(({ name, separator }, index) => (
            <span className="details-meta__genre" key={index}>
              <Button
                className="details-meta__genre-button"
                as={Link}
                to={`/`}
                variant="ghost"
                theme={theme}
                aria-label={`Explore more ${name} movies`}
              >
                {name}
              </Button>
              {separator}
            </span>
          ))}
        </span>
      }
    </div>
  );
};
