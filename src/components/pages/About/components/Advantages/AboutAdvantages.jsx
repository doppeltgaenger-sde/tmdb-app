import { parseInlineLink } from "@utils";
import { advantagesData } from "./data/advantagesData";
import "./styles/AboutAdvantages.scss";

export const AboutAdvantages = () => {
  return (
    <div className="about-advantages">
      <h3 className="about-advantages__title">The TMDB advantage</h3>

      <ol className="about-advantages__items">
        {advantagesData.map((paragraph, index) => (
          <li className="about-advantages__item" key={index}>
            {index === 0 
              ? parseInlineLink(paragraph, "https://www.themoviedb.org/2025", "about-advantages__button") 
              : paragraph
            }
          </li>
        ))}
      </ol>
    </div>
  );
};
