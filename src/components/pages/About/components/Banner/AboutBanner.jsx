import { Button } from "@shared";
import "./styles/AboutBanner.scss";

export const AboutBanner = ({ children }) => {
  return (
    <section className="about-banner">
      <div className="about-banner__backdround" />

      <div className="container">
        <div className="about-banner__body">
          {children}

          <Button
            className="about-banner__cta-button"
            variant="solid"
            theme="red"
            size="xl"
          >
            Join Us
          </Button>
        </div>
      </div>
    </section>
  );
};
