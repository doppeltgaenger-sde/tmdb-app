import { useMemo } from "react";
import { classNames } from "@utils";
import "./styles/Banner.scss";

const IMAGE_VARIANTS = {
  default: "https://image.tmdb.org/t/p/w1280",
  blue: "https://image.tmdb.org/t/p/w1920_and_h800_multi_faces_filter(duotone,00192f,00baff)",
  purple: "https://image.tmdb.org/t/p/w1920_and_h800_multi_faces_filter(duotone,190235,ad47dd)",
};

export const Banner = (props) => {
  const {
    className,
    variant = "default",
    backdrops = [],
    children,
  } = props;

  const backdrop = useMemo(() => {
    if (!backdrops.length) return null;
    return backdrops[0];
  }, [backdrops]);

  const imageBase =
    IMAGE_VARIANTS[variant] ||
    IMAGE_VARIANTS.default;

  const imageSrc = backdrop
    ? `${imageBase}${backdrop}`
    : null;

  return (
    <section
      className={classNames([
        "banner",
        variant !== "default" && `banner--${variant}`,
        className,
      ])}
    >
      {imageSrc && (
        <img
          className="banner__background"
          src={imageSrc}
          alt="tmdb banner background"
          loading="lazy"
          decoding="async"
        />
      )}

      <div className="container">
        <div className="banner__body">
          {children}
        </div>
      </div>
    </section>
  );
};

