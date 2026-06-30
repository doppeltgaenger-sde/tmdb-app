import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useViewport } from "@hooks";
import { 
  Button, 
  Average, 
  Icon, 
  Modal, 
  SpinLoader,
} from "@shared";
import { classNames } from "@utils";
import "./styles/MediaModal.scss";

const IMAGE_BASE_POSTER = "https://image.tmdb.org/t/p/w220_and_h330_face";
const IMAGE_BASE_POSTER_2X = "https://image.tmdb.org/t/p/w440_and_h660_face";

const IMAGE_BASE_BACKDROP_MB = "https://image.tmdb.org/t/p/w780";
const IMAGE_BASE_BACKDROP_TB = "https://image.tmdb.org/t/p/w1280";
const IMAGE_BASE_BACKDROP_DT = "https://image.tmdb.org/t/p/w1920_and_h600_multi_faces";

export const MediaModal = ({
  isOpen,
  onClose,
  id,
  mediaType = "movie",
  name, 
  date,
  posterPath, 
  backdropPath,
  voteAverage,
  episodesCount,
  description,
}) => {
  const [isPosterLoaded, setIsPosterLoaded] = useState(!posterPath);
  const [isBackdropLoaded, setIsBackdropLoaded] = useState(!backdropPath);
  const { isMobileSm, isMobileLg, isTablet } = useViewport();
  
  const showSkeleton = !posterPath;
  const linkTo = `/${mediaType}/${id}`;
  const isSeries = mediaType === "tv" && episodesCount > 0;
  const isMediaLoaded = isMobileSm ? !!isBackdropLoaded : (!!isPosterLoaded && !!isBackdropLoaded);

  const imageBase = isMobileLg 
    ? IMAGE_BASE_BACKDROP_MB 
    : isTablet ? IMAGE_BASE_BACKDROP_TB
    : IMAGE_BASE_BACKDROP_DT;

  useEffect(() => {
    if (isOpen) {
      setIsPosterLoaded(!posterPath);
      setIsBackdropLoaded(!backdropPath);
    }
  }, [isOpen, id, posterPath, backdropPath]);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="media-modal">
        {!isMediaLoaded && (
          <SpinLoader 
            className="media-modal__loader" 
            theme="light" 
          />
        )}

        <div 
          className={classNames([
            "media-modal__body",
            isMediaLoaded && "media-modal__body--visible"
          ])}
        >
          {!isMobileSm && (
            <div className="media-modal__poster">
              {showSkeleton ? (
                <Icon className="media-modal__placeholder" name="media-placeholder" />
              ) : (
                <img
                  className="media-modal__poster-image"
                  src={`${IMAGE_BASE_POSTER}${posterPath}`}
                  srcSet={`
                    ${IMAGE_BASE_POSTER}${posterPath} 1x, 
                    ${IMAGE_BASE_POSTER_2X}${posterPath} 2x
                  `}
                  alt={name ? `${name} media poster` : "TMDB media poster"}
                  loading="eager"
                  fetchPriority="high"
                  decoding="sync"
                  onLoad={() => setIsPosterLoaded(true)}
                />
              )}
            </div>
          )}

          <div className="media-modal__content">
            <div className="media-modal__title-block">
              <Average
                className="media-modal__average"
                value={voteAverage}
                isSkeleton={showSkeleton}
              />

              <h3 className="media-modal__name">
                <Button 
                  className="media-modal__name-button" 
                  as={Link} 
                  to={linkTo}
                  variant="ghost"
                  theme="light"
                  aria-label={`${name}, ${date}. View details.`}
                >
                  {name}
                </Button>
              </h3>

              <p className="media-modal__date">{date}</p>
            </div>

            <p className="media-modal__description">{description}</p>

            {isSeries && 
              <p className="media-modal__episodes">{episodesCount} episodes</p>
            }
          </div>
        </div>
        
        {backdropPath && (
          <div className="media-modal__backdrop">
            <img
              className="media-modal__backdrop-image"
              src={`${imageBase}${backdropPath}`}
              alt={name ? `${name} media backdrop` : "TMDB media backdrop"}
              loading="eager"
              fetchPriority="high"
              decoding="sync"
              onLoad={() => setIsBackdropLoaded(true)}
            />
          </div>
        )}
      </div>
    </Modal>
  );
};
