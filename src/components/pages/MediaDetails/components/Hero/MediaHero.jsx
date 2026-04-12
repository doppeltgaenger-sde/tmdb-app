import { useState } from "react";
import { useViewport } from "@hooks";
import { 
  classNames,
  getYear, 
  getTextColor,
} from "@utils";
import { 
  MediaBackdropLayer, 
  MediaMeta, 
  MediaCrew, 
  TrailerModal,
} from "@blocks";
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
  crew,
  mediaType,
  overlay,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { isMobileLg } = useViewport();

  const year = getYear(date);

  const textColor = getTextColor(overlay.h, overlay.s, overlay.l);
  const textVariant = textColor === "#000" ? "dark-text" : "light-text";

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <section 
      className={classNames([
        "media-hero", 
        `media-hero--${textVariant}`,
      ])}
      style={{ color: textColor }}
    >
      <MediaBackdropLayer
        className="media-hero__backdrop"
        backdrop_path={backdrop_path}
        overlay={overlay}
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
              alt={name}
              loading="eager" 
            />
          </div>

          <div className="media-hero__content">
            <h1 className="media-hero__title">
              <span className="media-hero__name">{name}</span>
              <span className="media-hero__date"> ({year})</span>
            </h1>
            
            <div className="media-hero__attractions">
              <div className="media-hero__average-block">
                <Average
                  className="media-hero__average"
                  value={vote_average}
                  size={isMobileLg ? "md" : "lg"}
                />

                <h3 className="media-hero__average-label">
                  <span className="block-text">User</span>
                  <span className="block-text">Score</span>
                </h3>
              </div>

              <Button
                className="media-hero__play-button"
                variant="overlay"
                iconLeft="play"
                onClick={openModal}
              >
                Play Trailer
              </Button>
            </div>

            <MediaMeta
              className="media-hero__meta"
              certification={certification}
              releaseDate={date}
              country="US"
              genres={genres}
              runtime={runtime}
            />

            {tagline && 
              <p className="media-hero__tagline">{tagline}</p>
            }

            <div className="media-hero__overview">
              <h2 className="media-hero__overview-title">Overview</h2>
              <p className="media-hero__overview-description">{description}</p>
            </div>

            <MediaCrew 
              className="media-hero__crew"
              crew={crew}
            />
          </div>
        </div>
      </div>

      <TrailerModal
        isOpen={isModalOpen}
        onClose={closeModal}
        mediaId={id}
        mediaType={mediaType}
        title={name}
      />
    </section>
  );
};
