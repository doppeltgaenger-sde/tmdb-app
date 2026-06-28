import { FooterLogo, FooterMenu, FooterCopyright } from "./components";
import "./styles/Footer.scss";

export const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__body">
          <div className="footer__top">
            <FooterLogo />
            <FooterMenu />
          </div>

          <div className="footer__bottom">
            <FooterCopyright />
          </div>
        </div>
      </div>
    </footer>
  );
};
