import { Link } from "react-router-dom";
import { classNames } from "@utils";
import { Button } from "@shared";
import "./styles/DetailsCrew.scss";

export const DetailsCrew = ({ className, crew = [], theme }) => {
  if (!crew.length) return null;

  return (
    <div className={classNames(["details-crew", className])}>
      {crew.map((person) => {
        const personJob = person.jobs.join(", ");

        return (
          <div className="details-crew__item" key={person.id}>
            <h3 className="details-crew__name">
              <Button 
                className="details-crew__button" 
                as={Link} 
                to={`/`}
                variant="ghost"
                theme={theme}
                aria-label={`${person.name}}, ${personJob}`}
              >
                {person.name}
              </Button>
            </h3>
            <p className="details-crew__jobs">
              {personJob}
            </p>
          </div>
        );
      })}
    </div>
  );
};