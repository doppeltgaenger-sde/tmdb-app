import { useViewport } from "@hooks";
import "./styles/ProviderBanner.scss";

const IMAGE_BASE = "https://media.themoviedb.org/t/p/h50_filter(negate,000,666)";
const IMAGE_BASE_2X = "https://media.themoviedb.org/t/p/h100_filter(negate,000,666)";

export const ProviderBanner = ({
  name,
  logoPath,
  title,
  children,
}) => {
  const { isMobileSm } = useViewport();
  
  return (
    <section className="provider-banner">
      <div className="container">
        <div className="provider-banner__body">
          <div className="provider-banner__logo">
            <img 
              className="provider-banner__logo-image" 
              src={`${IMAGE_BASE}${logoPath}`}
              srcSet={`
                ${IMAGE_BASE}${logoPath} 1x,
                ${IMAGE_BASE_2X}${logoPath} 2x
              `}
              alt={name ? `${name} provider logo` : "TMDB provider logo"}
              loading="eager"
              fetchPriority="high"
              decoding="sync"
            />
          </div>

          {!isMobileSm && title}
        </div>
      </div>

      {children}
    </section>
  );
};
