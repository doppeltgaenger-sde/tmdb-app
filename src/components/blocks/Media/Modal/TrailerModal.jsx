import { useEffect, useRef, useState } from "react";
import { fetchTrailer } from "@api";
import { Modal, Loader } from "@shared";
import { classNames } from "@utils";
import "./styles/TrailerModal.scss";

export const TrailerModal = ({
  isOpen,
  onClose,
  mediaId,
  mediaType,
  title,
}) => {
  const [trailerKey, setTrailerKey] = useState(null);
  const [isTrailerReady, setIsTrailerReady] = useState(false);
  const cacheRef = useRef({});

  useEffect(() => {
    if (!isOpen || !mediaId) return;

    let isActive = true;

    setTrailerKey(null);
    setIsTrailerReady(false);

    if (cacheRef.current[mediaId]) {
      setTrailerKey(cacheRef.current[mediaId]);
      return;
    }

    const loadTrailer = async () => {
      const key = await fetchTrailer(mediaId, mediaType);

      if (isActive) {
        cacheRef.current[mediaId] = key;
        setTrailerKey(key);
      }
    };

    loadTrailer();

    return () => {
      isActive = false;
    };
  }, [isOpen, mediaId, mediaType]);

  const shouldRenderIframe = Boolean(trailerKey);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="trailer-modal">
        <h3 className="trailer-modal__title">
          {trailerKey ? title : "No trailer available"}
        </h3>

        <div className="trailer-modal__video">
          {shouldRenderIframe && !isTrailerReady && (
            <Loader className="trailer-modal__loader" />
          )}

          {shouldRenderIframe && 
            <iframe
              className={classNames([
                "trailer-modal__iframe",
                isTrailerReady && "trailer-modal__iframe--visible",
              ])}
              src={`https://www.youtube.com/embed/${trailerKey}?rel=0&modestbranding=1`}
              title={title || "Trailer"}
              loading="lazy"
              onLoad={() => setIsTrailerReady(true)}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          }
        </div>
      </div>
    </Modal>
  );
};
