import { useViewport } from "@hooks";
import { buildOverlay, classNames } from "@utils";
import "./styles/MediaBackdropLayer.scss";

const IMAGE_BASE_MB = "https://media.themoviedb.org/t/p/w1000_and_h450_multi_faces";
const IMAGE_BASE_DT = "https://media.themoviedb.org/t/p/w1920_and_h800_multi_faces";

export const MediaBackdropLayer = ({ 
  className, 
  color, 
  backdrop_path,
}) => {
  const { isMobileLg } = useViewport();
  const imageBase = isMobileLg ? IMAGE_BASE_MB : IMAGE_BASE_DT;
  const overlays = buildOverlay(color);
  const overlayVariant = isMobileLg ? overlays.mobile : overlays.desktop;

  const overlay = color 
    ? overlayVariant
    : undefined;

  const imageUrl = backdrop_path 
    ? `${imageBase}${backdrop_path}` 
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
