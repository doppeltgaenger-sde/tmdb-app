import { Link } from "react-router-dom";
import { classNames } from "@utils";
import { Button, Icon } from "@shared"
import "./styles/SocialsGroup.scss";

export const SocialsGroup = ({ className, socials = [] }) => {
  if (!socials.length) return null;

  return (
    <section className={classNames([ "socials-group", className ])}>
      {socials.map((social) => (

        <Button
          className="socials-group__item"
          key={social.name}
          as={Link} 
          to={social.url}
          target="_blank"
          size="sm"
          variant="ghost"
          theme="dark"
          aria-label={`Visit our official ${social.name}`}
        >
          <Icon className="button__icon socials-group__icon" name={social.name} />
        </Button>
      ))}
    </section>
  );
};
