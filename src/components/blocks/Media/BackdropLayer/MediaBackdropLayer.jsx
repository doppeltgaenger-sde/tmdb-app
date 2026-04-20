import { useViewport } from "@hooks";
import { buildOverlay, classNames } from "@utils";
import "./styles/MediaBackdropLayer.scss";

const IMAGE_BASE_MB = "https://media.themoviedb.org/t/p/w1000_and_h450_multi_faces";
const IMAGE_BASE_DT = "https://media.themoviedb.org/t/p/w1920_and_h800_multi_faces";

export const MediaBackdropLayer = ({ 
  className, 
  overlay, 
  backdropPath,
}) => {
  const { isMobileLg } = useViewport();
  const imageBase = isMobileLg ? IMAGE_BASE_MB : IMAGE_BASE_DT;
  const overlayGradients = buildOverlay(overlay);
  const gradientSecondary = overlayGradients.secondary;

  const gradientPrimaryVariant = isMobileLg 
    ? overlayGradients.primaryMb 
    : overlayGradients.primaryDt;

  const imageUrl = backdropPath 
    ? `${imageBase}${backdropPath}` 
    : null;

  return (
    <div className={classNames(["media-backdrop-layer", className])}>
      <div
        className="media-backdrop-layer__image"
        style={imageUrl ? { backgroundImage: `url(${imageUrl})` } : undefined}
      />

      <div
        className={classNames([
          "media-backdrop-layer__overlay", 
          "media-backdrop-layer__overlay--primary", 
        ])}
        style={gradientPrimaryVariant ? { background: gradientPrimaryVariant } : undefined}
      />

      {isMobileLg &&
        <div
          className={classNames([
            "media-backdrop-layer__overlay", 
            "media-backdrop-layer__overlay--secondary", 
          ])}
          style={gradientSecondary ? { background: gradientSecondary } : undefined}
        />
      }
    </div>
  );
};
