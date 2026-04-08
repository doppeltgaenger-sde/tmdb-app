import {
  classNames,
  formatRuntime,
  formatGenres,
  formatDate,
} from "@utils";
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
  const genresContent = formatGenres(genres);
  const runtimeContent = formatRuntime(runtime);

  const hasMeta =
    certification ||
    date ||
    genresContent ||
    runtimeContent;

  if (!hasMeta) return null;

  return (
    <div className={classNames(["media-meta", className])}>
      {(certification || date) && 
        <span className="media-meta__item media-meta__item--release-date">
          {certification &&        
            <span className="media-meta__certification">
              {certification}
            </span>
          }

          {date && 
            <span className="media-meta__date">
              {date}
              {country && ` (${country})`}
            </span>
          }
        </span>
      }

      {genresContent &&
        <span className="media-meta__item media-meta__item--genres">
          {genresContent}
        </span>
      }

      {runtimeContent &&
        <span className="media-meta__item media-meta__item--runtime">
          {runtimeContent}
        </span>
      }
    </div>
  );
};
