import { useViewport } from "@hooks";
import { parseInlineMarkup } from "@utils";
import { Banner, Button } from "@shared";
import { bannerData } from "./data/bannerData";
import "./styles/SignupBanner.scss";

const backdropKeys = ["/lMnoYqPIAVL0YaLP5YjRy7iwaYv.jpg"];

export const SignupBanner = () => {
  const {
    title,
    cta: { label },
    desktop,
    mobile,
  } = bannerData;

  const { lead: desktopLead, features: desktopFeatures } = desktop;

  const { lead: mobileLead, features: mobileFeatures } = mobile;

  const { isMobileLg } = useViewport();

  return (
    <Banner className="signup-banner" variant="purple" backdrops={backdropKeys}>
      <h2 className="signup-banner__title">{title}</h2>

      {isMobileLg
        ? renderMobileContent(mobileLead, mobileFeatures, label)
        : renderDesktopContent(desktopLead, label, desktopFeatures)}
    </Banner>
  );
};

const renderDesktopContent = (lead, label, features) => {
  return (
    <div className="signup-banner__content">
      <div className="signup-banner__main">
        <p className="signup-banner__lead">{parseInlineMarkup(lead)}</p>

        <Button
          className="signup-banner__cta-button"
          variant="promo"
          theme="purple"
        >
          {label}
        </Button>
      </div>

      <ul className="signup-banner__features">
        {features.map((item) => (
          <li className="signup-banner__feature" key={item}>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

const renderMobileContent = (lead, features, label) => {
  return (
    <div className="signup-banner__content">
      <p className="signup-banner__lead">{lead}</p>

      <ul className="signup-banner__features">
        {features.map((item) => (
          <li className="signup-banner__feature" key={item}>
            {item}
          </li>
        ))}
      </ul>

      <Button className="signup-banner__cta-button" variant="primary">
        {label}
      </Button>
    </div>
  );
};
