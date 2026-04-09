import { getYear, getColorFromId, getTextColor } from "@utils";
import { MediaBackdropLayer, MediaMeta } from "@blocks";
import { Average, Button } from "@shared";
import "./styles/MediaHero.scss";

const IMAGE_BASE = "https://media.themoviedb.org/t/p/w300_and_h450_face";
const IMAGE_BASE_2X = "https://media.themoviedb.org/t/p/w600_and_h900_face";

export const MediaHero = ({
  id,
  name,
  date,
  vote_average,
  tagline,
  description,
  backdrop_path,
  poster_path,
  runtime,
  genres,
  certification,
}) => {
  const year = getYear(date);
  const color = getColorFromId(id);
  const textColor = getTextColor(color.r, color.g, color.b);

  return (
    <section className="media-hero" style={{ color: textColor }}>
      <MediaBackdropLayer
        className="media-hero__backdrop"
        color={color}
        backdrop_path={backdrop_path}
      />

      <div className="container">
        <div className="media-hero__body">
          <div className="media-hero__poster">
            <img
              className="media-hero__poster-image"
              src={`${IMAGE_BASE}${poster_path}`}
              srcSet={`
                ${IMAGE_BASE}${poster_path} 1x,
                ${IMAGE_BASE_2X}${poster_path} 2x
              `}
              alt={name ? `${name} film poster` : "tmdb film poster"}
              loading="lazy"
            />
          </div>

          <div className="media-hero__content">
            <h1 className="media-hero__title">
              <span className="media-hero__name">{name}</span>
              <span className="media-hero__date">({year})</span>
            </h1>

            <MediaMeta
              className="media-hero__meta"
              certification={certification}
              releaseDate={date}
              country="US"
              genres={genres}
              runtime={runtime}
            />

            <Average
              className="media-hero__average"
              value={vote_average}
              size="md"
            />

            <Button
              className="media-hero__play-button"
              variant="overlay"
              iconLeft="play"
            >
              Play Trailer
            </Button>

            {tagline && 
              <p className="media-hero__tagline">{tagline}</p>
            }

            <div className="media-hero__overview">
              <h2 className="media-hero__overview-title">Overview</h2>
              <p className="media-hero__overview-description">{description}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
