import { Link } from "react-router-dom";
import { Button } from "@shared";
import "./styles/FooterLogo.scss";
import tmdbLogo from "@assets/tmdb-logo--middle.svg";

export const FooterLogo = () => {
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
        src={tmdbLogo} 
        alt="TMDB official logo" 
      />
    </Button>
  );
};
