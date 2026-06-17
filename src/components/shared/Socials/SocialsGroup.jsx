import { Link } from "react-router-dom";
import { classNames } from "@utils";
import { Button, Icon } from "@shared"
import "./styles/SocialsGroup.scss";

export const SocialsGroup = ({ className, items = [] }) => {
  if (!items.length) return null;

  return (
    <div className={classNames([ "socials-group", className ])}>
      {items.map((social) => (

        <Button
          className="socials-group__item"
          key={social.name}
          as={Link} 
          to={social.url}
          target="_blank"
          variant="ghost"
          theme="dark"
          aria-label={`Visit our official ${social.name}`}
        >
          <Icon className="button__icon socials-group__icon" name={social.name} />
        </Button>
      ))}
    </div>
  );
};
