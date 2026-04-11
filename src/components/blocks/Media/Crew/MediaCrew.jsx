import { classNames } from "@utils";
import { Link } from "react-router-dom";
import { Button } from "@shared";
import "./styles/MediaCrew.scss";

export const MediaCrew = ({ className, crew = [] }) => {
  if (!crew.length) return null;

  return (
    <div className={classNames(["media-crew", className])}>
      {crew.map((person) => (
        <div className="media-crew__item" key={person.id}>
          <h3 className="media-crew__name">
            <Button 
              className="media-crew__button" 
              as={Link} 
              to={`/`}
              variant="overlay"
            >
              {person.name}
            </Button>
          </h3>
          <p className="media-crew__jobs">
            {person.jobs.join(", ")}
          </p>
        </div>
      ))}
    </div>
  );
};