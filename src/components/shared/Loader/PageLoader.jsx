import { classNames } from "@utils";
import "./styles/PageLoader.scss";
import tmdbLogo from "./assets/tmdb-logo--full.svg";

export const PageLoader = ({ className }) => {
  return (
    <div
      className={classNames([
        "page-loader", 
        className
      ])}
    >
      <img 
        className="page-loader__logo" 
        src={tmdbLogo} 
        alt="TMDB official logo" 
      />

      <div className="page-loader__dots">
        <div className="page-loader__dot" />
        <div className="page-loader__dot" />
        <div className="page-loader__dot" />
      </div>
    </div>
  );
};
