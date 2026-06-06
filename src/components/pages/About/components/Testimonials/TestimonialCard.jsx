import { memo } from "react";
import "./styles/TestimonialCard.scss"

export const TestimonialCard = memo(({
  name, 
  role,
  company,
  testimonial,
  logo
}) => {
  return (
    <div className="testimonial-card">
      <div className="testimonial-card__logo">
        <img 
          className="testimonial-card__logo-image" 
          src={logo}
          alt={company ? `${company} customer logo` : "TMDB customer logo"}
          loading="lazy"
          fetchPriority="low"
          decoding="async"
        />
      </div>

      <div className="testimonial-card__content">
        <p className="testimonial-card__testimonial-text">
          {testimonial}
        </p>

        <h3 className="testimonial-card__customer">
          {name}, {role} of {company}
        </h3>
      </div>
    </div>
  );
});
