import { Link } from "react-router-dom";
import { classNames } from "@utils";
import { Button } from "@shared";
import "./styles/MediaMeta.scss";

export const MediaMeta = ({
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
    <div className={classNames(["media-meta", className])}>
      {(certification || date) && 
        <span className="media-meta__item media-meta__item--release-date">
          {certification && 
            <span className="media-meta__certification">{certification}</span>
          }

          {date && 
            <span className="media-meta__date">
              {date}
              {country && ` (${country})`}
            </span>
          }
        </span>
      }

      {runtime && 
        <span className="media-meta__item media-meta__item--runtime">
          {runtime}
        </span>
      }

      {genres && 
        <span className="media-meta__item media-meta__item--genres">
          {genres.map(({ name, separator }, index) => (
            <span className="media-meta__genre" key={index}>
              <Button
                className="media-meta__genre-button"
                as={Link}
                to={`/`}
                variant="overlay"
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
