import { 
  classNames, 
  formatRuntime, 
  formatGenresList, 
  formatDate 
} from "@utils";
import { Link } from "react-router-dom";
import { Button } from "@shared";
import "./styles/MediaMeta.scss";

export const MediaMeta = ({
  className,
  certification,
  releaseDate,
  country,
  genres,
  runtime,
}) => {
  const date = formatDate(releaseDate);
  const runtimeContent = formatRuntime(runtime);
  const genresList = formatGenresList(genres);

  const hasMeta = certification || date || genresList || runtimeContent;

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
              {country && `(${country})`}
            </span>
          }
        </span>
      }

      {runtimeContent && 
        <span className="media-meta__item media-meta__item--runtime">
          {runtimeContent}
        </span>
      }

      {genresList  && 
        <span className="media-meta__item media-meta__item--genres">
          {genresList.map(({ name, separator }, index) => (
            <span className="media-meta__genre" key={index}>
              <Button
                className="media-meta__genre-button"
                as={Link}
                to={`/`}
                variant="overlay"
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
