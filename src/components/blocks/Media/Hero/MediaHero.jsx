import { useState } from "react";
import { useViewport } from "@hooks";
import { classNames, getTextColor } from "@utils";
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
  variant,
  id,
  name,
  fullDate,
  yearDate,
  posterPath,
  backdropPath,
  voteAverage,
  trailerId,
  tagline,
  description,
  mediaType,
  runtime,
  country,
  genres,
  certification,
  crew,
  mediaAmount,
  contextColor,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { isMobileLg } = useViewport();

  const textColor = getTextColor(contextColor.h, contextColor.s,contextColor.l);
  const theme = textColor === "#000" ? "dark" : "light";

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <section 
      className={classNames([
        "media-hero", 
        `media-hero--${theme}`,
        `media-hero--${variant}`,
      ])}
      style={{ color: textColor }}
    >
      <MediaBackdropLayer
        className="media-hero__backdrop"
        backdropPath={backdropPath}
        overlay={contextColor}
      />

      <div className="container">
        <div className="media-hero__body">
          {!isMobileLg &&         
            <div className="media-hero__poster">
              <img
                className="media-hero__poster-image"
                src={`${IMAGE_BASE}${posterPath}`}
                srcSet={`
                  ${IMAGE_BASE}${posterPath} 1x,
                  ${IMAGE_BASE_2X}${posterPath} 2x
                `}
                alt={name}
                loading="eager" 
              />
            </div>
          }

          <div className="media-hero__content">
            <h1 className="media-hero__title">
              <span className="media-hero__name">{name}</span>

              {yearDate &&            
                <span className="media-hero__date"> ({yearDate})</span>
              }
            </h1>
            
            <div className="media-hero__attractions">
              <div className="media-hero__average-block">
                <Average
                  className="media-hero__average"
                  value={voteAverage}
                  size={isMobileLg ? "md" : "lg"}
                />

                <p className="media-hero__average-label">
                  <span className="block-text">User</span>
                  <span className="block-text">Score</span>
                </p>
              </div>

              {trailerId &&       
                <Button
                  className="media-hero__play-button"
                  variant="ghost"
                  theme={theme}
                  iconLeft="play"
                  onClick={openModal}
                >
                  Play Trailer
                </Button>
              }
            </div>

            <MediaMeta
              className="media-hero__meta"
              certification={certification}
              date={fullDate}
              country={country}
              genres={genres}
              runtime={runtime}
              theme={theme}
            />

            {tagline && 
              <p className="media-hero__tagline">{tagline}</p>
            }

            {mediaAmount &&
              <p className="media-hero__media-amount">Number of Movies: {mediaAmount}</p>
            }

            <div className="media-hero__overview">
              <h2 className="media-hero__overview-title">Overview</h2>
              <p className="media-hero__overview-description">{description}</p>
            </div>

            {crew &&          
              <MediaCrew 
                className="media-hero__crew"
                crew={crew}
                theme={theme}
              />
            }
          </div>
        </div>
      </div>
      
      {trailerId &&   
        <TrailerModal
          isOpen={isModalOpen}
          onClose={closeModal}
          mediaId={id}
          mediaType={mediaType}
          title={name}
        />
      }
    </section>
  );
};
