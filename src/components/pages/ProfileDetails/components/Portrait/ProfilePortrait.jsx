import { useViewport } from "@hooks";
import { Icon } from "@shared";
import "./styles/ProfilePortrait.scss";

const IMAGE_BASE = {
  mobile: {
    base: "https://media.themoviedb.org/t/p/w235_and_h235_face",
    base2x: "https://media.themoviedb.org/t/p/w375_and_h375_face",
  },
  desktop: {
    base: "https://image.tmdb.org/t/p/w220_and_h330_face",
    base2x: "https://image.tmdb.org/t/p/w440_and_h660_face",
  },
};

export const ProfilePortrait = ({ profilePath, name }) => {
  const { isMobileLg } = useViewport();
  const showSkeleton = !profilePath;

  const { base, base2x } = isMobileLg 
    ? IMAGE_BASE.mobile
    : IMAGE_BASE.desktop;

  return (
    <section className="profile-portrait">
      {showSkeleton ? (
        <Icon
          className="profile-portrait__placeholder"
          name="media-placeholder"
        />
      ) : (
          <img
            className="profile-portrait__image"
            src={`${base}${profilePath}`}
            srcSet={`
              ${base}${profilePath} 1x,
              ${base2x }${profilePath} 2x
            `}
            alt={name ? `${name} profile` : "TMDB person profile"}
            loading="eager"
            fetchPriority="high"
            decoding="sync"
          />
      )}
    </section>
  );
};
