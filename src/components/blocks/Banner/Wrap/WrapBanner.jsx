import { useMemo } from "react";
import { Link } from "react-router-dom";
import { useViewport } from "@hooks";
import { Button } from "@shared";
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

          <Button
            className="wrap-banner__button"
            as={Link} 
            to="https://www.themoviedb.org/2025"
            target="_blank"
            size="lg"
            variant="promo"
            theme="gradient"
            iconRight="arrow-right"
          >
            Check it out
          </Button>
        </div>
      </div>

      <div className="wrap-banner__backdrops">
        {displayedBannerData.map((backdrop, index) => {
          const current = backdrop[deviceKey];
          const src = current.image || current.fallback;

          return (
            <div
              className="wrap-banner__backdrop"
              key={backdrop.id}
              style={{
                backgroundImage: `url(${src})`,
              }}
            />
          );
        })}
      </div>
    </section>
  );
};
