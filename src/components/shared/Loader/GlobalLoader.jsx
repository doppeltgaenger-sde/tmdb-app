import { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import { classNames } from "@utils";
import "./styles/GlobalLoader.scss";
import tmdbLogoPill1 from "./assets/tmdb-logo-pill-1.svg";
import tmdbLogoPill2 from "./assets/tmdb-logo-pill-2.svg";
import tmdbLogoWord1 from "./assets/tmdb-logo-word-1.svg";
import tmdbLogoWord2 from "./assets/tmdb-logo-word-2.svg";
import tmdbLogoWord3 from "./assets/tmdb-logo-word-3.svg";

export const GlobalLoader = () => {
  const isInitialized = useSelector((state) => state.configuration.isInitialized);

  const [visible, setVisible] = useState(true);
  const [isClose, setIsClose] = useState(false);
  
  const hasFinishedInitial = useRef(false);
  const startTimeRef = useRef(Date.now());
  const MIN_SHOW_TIME = 1300;

  useEffect(() => {
    if (isInitialized && !isClose && !hasFinishedInitial.current) {
      const elapsed = Date.now() - startTimeRef.current;
      const remaining = Math.max(MIN_SHOW_TIME - elapsed, 0);

      const closeTimer = setTimeout(() => {
        setIsClose(true);
        hasFinishedInitial.current = true;

        const unmountTimer = setTimeout(() => {
          setVisible(false);
        }, 600);

        return () => clearTimeout(unmountTimer);
      }, remaining);

      return () => clearTimeout(closeTimer);
    }
  }, [isInitialized, isClose]);

  if (!visible) return null;

  return (
    <div
      className={classNames([
        "global-loader",
        isClose && "global-loader--close",
      ])}
    >
      <div className="global-loader__body">
        <img
          className="global-loader__part global-loader__part--word-1"
          src={tmdbLogoWord1}
          alt="TMDB official logo"
        />

        <img
          className="global-loader__part global-loader__part--pill-1"
          src={tmdbLogoPill1}
          alt="TMDB official logo"
        />

        <img
          className="global-loader__part global-loader__part--word-2"
          src={tmdbLogoWord2}
          alt="TMDB official logo"
        />

        <img
          className="global-loader__part global-loader__part--pill-2"
          src={tmdbLogoPill2}
          alt="TMDB official logo"
        />

        <img
          className="global-loader__part global-loader__part--word-3"
          src={tmdbLogoWord3}
          alt="TMDB official logo"
        />
      </div>
    </div>
  );
};
