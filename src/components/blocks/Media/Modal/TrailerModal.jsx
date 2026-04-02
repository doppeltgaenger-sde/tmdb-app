import { useEffect, useState } from "react";
import { fetchTrailer } from "@api";
import { Modal, Loader } from "@shared";
import { classNames } from "@utils";
import "./styles/TrailerModal.scss";

export const TrailerModal = (props) => {
  const { 
    isOpen, 
    onClose, 
    mediaId, 
    mediaType, 
    title,
  } = props;

  const [trailerKey, setTrailerKey] = useState(null);
  const [isTrailerReady, setIsTrailerReady] = useState(false);

  useEffect(() => {
    if (!isOpen || !mediaId) return;

    setTrailerKey(null);
    setIsTrailerReady(false);

    const loadTrailer = async () => {
      const key = await fetchTrailer(mediaId, mediaType);
      setTrailerKey(key);
    };

    loadTrailer();
  }, [isOpen, mediaId, mediaType]);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="trailer-modal">
        <h3 className="trailer-modal__title">
          {trailerKey ? title : "No trailer available"}
        </h3>

        <div className="trailer-modal__video">
          {trailerKey && !isTrailerReady && (
            <Loader className="trailer-modal__loader" />
          )}

          {trailerKey && (
            <iframe
              className={classNames([
                "trailer-modal__iframe",
                isTrailerReady && "trailer-modal__iframe--visible",
              ])}
              src={`https://www.youtube.com/embed/${trailerKey}`}
              title={title || "TMDB trailer"}
              onLoad={() => setIsTrailerReady(true)}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          )}
        </div>
      </div>
    </Modal>
  );
};
