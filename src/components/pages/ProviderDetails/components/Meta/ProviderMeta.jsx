import { Link } from "react-router-dom";
import { useViewport } from "@hooks";
import { Icon, Button } from "@shared";
import "./styles/ProviderMeta.scss"

export const ProviderMeta = ({
  title,
  name,
  office,
  country,
  homepage,
}) => {
  const { isMobileSm } = useViewport();

  return (
    <div className="provider-meta">
      <div className="container">
        <div className="provider-meta__body">
          <div className="provider-meta__items">
            <div className="provider-meta__item">
              <Icon className="provider-meta__icon" name="badge" />
              <span className="provider-meta__value">{name}</span>
            </div>

            <div className="provider-meta__item">
              <Icon className="provider-meta__icon" name="location" />
              <span className="provider-meta__value">{office}</span>
            </div>

            <div className="provider-meta__item">
              <Icon className="provider-meta__icon" name="planet" />
              <span className="provider-meta__value">{country}</span>
            </div>

            <Button 
              className="provider-meta__item"
              as={Link} 
              to={homepage}
              target="_blank"
              variant="ghost"
              theme="light"
              iconLeft="homepage"
              aria-label={`${name}. View details.`}
            >
              Homepage
            </Button>
          </div>

          {isMobileSm && title}
        </div>
      </div>
    </div>
  );
};
