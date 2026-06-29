import { Link } from "react-router-dom";
import { Button } from "@shared";
import "./styles/FooterCopyright.scss";

export const FooterCopyright = () => {
  return (
    <p className="footer-copyright">
      <span className="footer-copyright__content">2026 © Powered by</span>

      <Button
        className="footer-copyright__button"
        as={Link} 
        to="https://github.com/doppeltgaenger-sde/tmdb-app"
        target="_blank"
        variant="ghost"
        theme="light"
        aria-label="Visit doppeltgaenger's GitHub profile"
        iconRight="github"
      >
        doppeltgaenger
      </Button>
    </p>
  );
};
