import { memo } from "react";
import { Link } from "react-router-dom";
import { 
  Avatar, 
  Button, 
  ScoreBage, 
  ExpandableText, 
} from "@shared";
import "./styles/ReviewCard.scss"

export const ReviewCard = memo(({
  username, 
  color,
  avatar,
  review,
}) => {
  const {
    score,
    date,
    title,
    content,
  } = review;

  const paragraphs = content.split("\n\n");

  return (
    <div className="review-card">
      <div className="review-card__header-block">
        <Avatar
          className="review-card__avatar"
          src={avatar}
          name={username}
          color={color}
          size="sm"
        />

        <div className="review-card__meta">
          <h3 className="review-card__title">
            <Button 
              className="review-card__button" 
              as={Link} 
              to={`/`}
              variant="overlay"
              theme="dark"
              aria-label={`View ${username}'s profile`}
            >
              {username}
            </Button>
          </h3>

          <p className="review-card__timestamp">
            Written on {date}
          </p>

          <ScoreBage 
            className="review-card__score-bage"
            score={score}
          />
        </div>
      </div>

      <ExpandableText className="review-card__content">
        <h4 className="review-card__review-title">
          {title}
        </h4>

        {paragraphs.map((paragraph, index) => (
          <p className="review-card__review-text" key={index}>
            {paragraph}
          </p>
        ))}
      </ExpandableText>
    </div>
  );
});
