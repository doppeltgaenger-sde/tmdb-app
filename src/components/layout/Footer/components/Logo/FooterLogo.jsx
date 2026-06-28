import { Link } from "react-router-dom";
import { useViewport } from "@hooks";
import { Button } from "@shared";
import "./styles/FooterLogo.scss";
import tmdbLogoDt from "@assets/tmdb-logo--full.svg";
import tmdbLogoMb from "@assets/tmdb-logo--short.svg";

export const FooterLogo = () => {
  const { isMobileSm } = useViewport();
  const deviceKey = isMobileSm ? tmdbLogoMb : tmdbLogoDt;

  return (
    <Button
      className="footer-logo"
      as={Link} 
      to="/"
      variant="ghost"
      aria-label="Visit TMDB official site"
    >
      <img 
        className="footer-logo__image" 
        src={deviceKey} 
        alt="TMDB official logo" 
      />
    </Button>
  );
};
