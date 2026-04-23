import { Link } from "react-router-dom";
import { classNames } from "@utils";
import { Button } from "@shared"
import "./styles/KeywordsGroup.scss";

export const KeywordsGroup = ({ className, title, keywords = [] }) => {
  return (
    <section
      className={classNames([
        "keywords-group", 
        className,
      ])}
    >
      {title &&    
        <h3 className="keywords-group__title">{title}</h3>
      }

      {keywords.length ? (
        <div className="keywords-group__list">
          {keywords.map((keyword) => (
            <Button
              className="keywords-group__item"
              key={keyword.id}
              as={Link} 
              to={`/`}
              size="sm"
              variant="solid"
              theme="neutral"
              aria-label={`Search movies by keyword: ${keyword.name}`}
            >
              {keyword.name}
            </Button>
          ))}
        </div>
      ) : (
        <p className="keywords-group__empty">
          No keywords have been added.
        </p>
      )}
    </section>
  );
};
