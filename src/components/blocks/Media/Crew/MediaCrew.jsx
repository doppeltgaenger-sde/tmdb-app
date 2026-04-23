import { Link } from "react-router-dom";
import { classNames } from "@utils";
import { Button } from "@shared";
import "./styles/MediaCrew.scss";

export const MediaCrew = ({ className, crew = [], theme }) => {
  if (!crew.length) return null;

  return (
    <div className={classNames(["media-crew", className])}>
      {crew.map((person) => {
        const personJob = person.jobs.join(", ");

        return (
          <div className="media-crew__item" key={person.id}>
            <h3 className="media-crew__name">
              <Button 
                className="media-crew__button" 
                as={Link} 
                to={`/`}
                variant="ghost"
                theme={theme}
                aria-label={`${person.name}}, ${personJob}`}
              >
                {person.name}
              </Button>
            </h3>
            <p className="media-crew__jobs">
              {personJob}
            </p>
          </div>
        );
      })}
    </div>
  );
};