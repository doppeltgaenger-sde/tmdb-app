import { buildOverlay, classNames } from "@utils";
import "./styles/MediaBackdropLayer.scss";

const IMAGE_BASE = "https://media.themoviedb.org/t/p/w1920_and_h800_multi_faces";

export const MediaBackdropLayer = ({ 
  className, 
  color, 
  backdrop_path,
}) => {
  const overlay = color 
    ? buildOverlay(color) 
    : undefined;

  const imageUrl = backdrop_path 
    ? `${IMAGE_BASE}${backdrop_path}` 
    : null;

  return (
    <div className={classNames(["media-backdrop-layer", className])}>
      <div
        className="media-backdrop-layer__image"
        style={imageUrl ? { backgroundImage: `url(${imageUrl})` } : undefined}
      />

      <div
        className="media-backdrop-layer__overlay"
        style={overlay ? { background: overlay } : undefined}
      />
    </div>
  );
};
