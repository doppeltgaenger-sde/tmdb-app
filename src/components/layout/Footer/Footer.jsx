import { FooterLogo, FooterCopyright } from "./components";
import "./styles/Footer.scss";

export const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__body">
          <FooterLogo />
          <FooterCopyright />
        </div>
      </div>
    </footer>
  );
};
