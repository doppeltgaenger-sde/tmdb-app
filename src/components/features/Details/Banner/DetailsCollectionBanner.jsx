import { Link } from "react-router-dom";
import { Banner, Button } from "@shared";
import "./styles/DetailsCollectionBanner.scss";

export const DetailsCollectionBanner = ({ collection }) => {
  if (!collection) return null;
  
  const {
    id,
    name,
    backdropPath,
  } = collection;

  const linkTo = `/collection/${id}`;
  const backdropKeys = [backdropPath];

  return (
    <Banner 
      className="details-collection-banner"
      variant="collection"
      backdrops={backdropKeys}
    >
      <h2 className="details-collection-banner__title">
        Explore Universe
      </h2>

      <p className="details-collection-banner__subtitle">
        {name}
      </p>

      <Button
        className="details-collection-banner__button"
        as={Link} 
        to={linkTo}
        variant="outline"
        theme="green-gradient"
        aria-label={`${name}. View details.`}    
      >
        View the Collection
      </Button>
    </Banner>
  );
};
