import { useState } from "react";
import { useViewport } from "@hooks";
import { classNames, getTextColor } from "@utils";
import { 
  DetailsBackdrop, 
  DetailsMeta, 
  DetailsCrew, 
  TrailerModal,
} from "@features";
import { Average, Button } from "@shared";
import "./styles/DetailsBackdropBanner.scss";

const IMAGE_BASE = "https://media.themoviedb.org/t/p/w300_and_h450_face";
const IMAGE_BASE_2X = "https://media.themoviedb.org/t/p/w600_and_h900_face";

export const DetailsBackdropBanner = ({
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
        "details-backdrop-banner", 
        `details-backdrop-banner--${theme}`,
        `details-backdrop-banner--${variant}`,
      ])}
      style={{ color: textColor }}
    >
      <DetailsBackdrop
        className="details-backdrop-banner__backdrop"
        backdropPath={backdropPath}
        overlay={contextColor}
      />

      <div className="container">
        <div className="details-backdrop-banner__body">
          {!isMobileLg &&         
            <div className="details-backdrop-banner__poster">
              <img
                className="details-backdrop-banner__poster-image"
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

          <div className="details-backdrop-banner__content">
            <h1 className="details-backdrop-banner__title">
              <span className="details-backdrop-banner__name">{name}</span>

              {yearDate &&            
                <span className="details-backdrop-banner__date"> ({yearDate})</span>
              }
            </h1>
            
            <div className="details-backdrop-banner__attractions">
              <div className="details-backdrop-banner__average-block">
                <Average
                  className="details-backdrop-banner__average"
                  value={voteAverage}
                  size={isMobileLg ? "md" : "lg"}
                />

                <p className="details-backdrop-banner__average-label">
                  <span className="block-text">User</span>
                  <span className="block-text">Score</span>
                </p>
              </div>

              {trailerId &&       
                <Button
                  className="details-backdrop-banner__play-button"
                  variant="ghost"
                  theme={theme}
                  iconLeft="play"
                  onClick={openModal}
                >
                  Play Trailer
                </Button>
              }
            </div>

            <DetailsMeta
              className="details-backdrop-banner__meta"
              certification={certification}
              date={fullDate}
              country={country}
              genres={genres}
              runtime={runtime}
              theme={theme}
            />

            {tagline && 
              <p className="details-backdrop-banner__tagline">{tagline}</p>
            }

            {mediaAmount &&
              <p className="details-backdrop-banner__media-amount">Number of Movies: {mediaAmount}</p>
            }

            <div className="details-backdrop-banner__overview">
              <h2 className="details-backdrop-banner__overview-title">Overview</h2>
              <p className="details-backdrop-banner__overview-description">{description}</p>
            </div>

            {variant === "media" && crew &&          
              <DetailsCrew 
                className="details-backdrop-banner__crew"
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
