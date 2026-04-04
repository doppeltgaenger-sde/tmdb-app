import { useMemo } from "react";
import { useViewport } from "@hooks";
import { Icon } from "@shared";
import { bannerData } from "./data/bannerData";
import "./styles/WrapBanner.scss";

export const WrapBanner = () => {
  const { isMobileSm } = useViewport();

  const MAX_ITEMS = isMobileSm ? 6 : 5;

  const deviceKey = useMemo(() => {
    return isMobileSm ? "mobile" : "desktop";
  }, [isMobileSm]);

  const displayedBannerData = useMemo(() => {
    return bannerData.slice(0, MAX_ITEMS);
  }, [MAX_ITEMS]);

  return (
    <section className="wrap-banner">
      <div className="container">
        <div className="wrap-banner__body">
          <h1 className="wrap-banner__title">
            <span className="block-text">That's a</span>
            <span className="block-text">Wrap 2025</span>
          </h1>

          <p className="wrap-banner__subtitle">
            The best (and worst) of the year from TMDB.
          </p>

          <a
            className="wrap-banner__button"
            href="https://www.themoviedb.org/2025"
          >
            <span className="wrap-banner__button-content">Check it out</span>
            <Icon className="wrap-banner__button-icon" name="arrow-right" />
          </a>
        </div>
      </div>

      <div className="wrap-banner__backdrops">
        {displayedBannerData.map((backdrop, index) => {
          const current = backdrop[deviceKey];
          const src = current.image || current.fallback;

          return (
            <div className="wrap-banner__backdrop" key={backdrop.id}>
              <img
                className="wrap-banner__image"
                src={src}
                alt="tmdb banner backdrop"
                loading={index === 0 ? "eager" : "lazy"}
              />
            </div>
          );
        })}
      </div>
    </section>
  );
};
