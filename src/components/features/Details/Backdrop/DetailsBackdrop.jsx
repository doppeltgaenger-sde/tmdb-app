import { useViewport } from "@hooks";
import { buildOverlay, classNames } from "@utils";
import "./styles/DetailsBackdrop.scss";

const IMAGE_BASE_MB = "https://media.themoviedb.org/t/p/w1000_and_h450_multi_faces";
const IMAGE_BASE_DT = "https://media.themoviedb.org/t/p/w1920_and_h800_multi_faces";

export const DetailsBackdrop = ({ 
  className, 
  overlay, 
  backdropPath,
}) => {
  const { isMobileLg } = useViewport();
  const imageBase = isMobileLg ? IMAGE_BASE_MB : IMAGE_BASE_DT;
  const overlayGradients = buildOverlay(overlay);

  const gradientVariant = isMobileLg 
    ? overlayGradients.overlayMb 
    : overlayGradients.overlayDt;

  const imageUrl = backdropPath 
    ? `${imageBase}${backdropPath}` 
    : null;

  return (
    <div className={classNames(["details-backdrop", className])}>
      <div
        className="details-backdrop__image"
        style={imageUrl ? { backgroundImage: `url(${imageUrl})` } : undefined}
      />

      <div
        className="details-backdrop__overlay"
        style={gradientVariant ? { background: gradientVariant } : undefined}
      />
    </div>
  );
};
