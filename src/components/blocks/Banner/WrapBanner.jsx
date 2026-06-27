import { useMemo } from "react";
import { Link } from "react-router-dom";
import { useViewport } from "@hooks";
import { classNames } from "@utils";
import { Button } from "@shared";
import { wrapBannerData } from "./data/wrapBannerData";
import "./styles/WrapBanner.scss";

export const WrapBanner = ({
  className,
  title,
  subtitle,
  linkContent,
  linkAriaLabel,
  linkTo,
  linkTarget = "",
}) => {
  const { isMobileSm } = useViewport();

  const MAX_ITEMS = isMobileSm ? 6 : 5;

  const deviceKey = useMemo(() => {
    return isMobileSm ? "mobile" : "desktop";
  }, [isMobileSm]);

  const displayedBannerData = useMemo(() => {
    return wrapBannerData.slice(0, MAX_ITEMS);
  }, [MAX_ITEMS]);

  return (
    <section
      className={classNames([
        "wrap-banner", 
        className,
      ])}
    >
      <div className="container">
        <div className="wrap-banner__body">
          <h1 className="wrap-banner__title">{title}</h1>
          <p className="wrap-banner__subtitle">{subtitle}</p>

          <Button
            className="wrap-banner__button"
            as={Link} 
            to={linkTo}
            target={linkTarget}
            size="lg"
            variant="outline"
            theme="pink-gradient"
            iconRight="arrow-right"
            aria-label={linkAriaLabel}
          >
            {linkContent}
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
