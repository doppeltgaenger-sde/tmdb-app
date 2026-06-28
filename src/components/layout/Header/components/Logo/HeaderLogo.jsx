import { Link } from "react-router-dom";
import { useViewport } from "@hooks";
import { Button } from "@shared";
import "./styles/HeaderLogo.scss";
import tmdbLogoDt from "@assets/tmdb-logo--short.svg";
import tmdbLogoMb from "@assets/tmdb-logo--full.svg";

export const HeaderLogo = () => {
  const { isMobileLg } = useViewport();
  const deviceKey = isMobileLg ? tmdbLogoMb : tmdbLogoDt;

  return (
    <Button
      className="header-logo"
      as={Link} 
      to="/"
      variant="ghost"
      aria-label="Visit TMDB official site"
    >
      <img 
        className="header-logo__image" 
        src={deviceKey} 
        alt="TMDB official logo" 
      />
    </Button>
  );
};
