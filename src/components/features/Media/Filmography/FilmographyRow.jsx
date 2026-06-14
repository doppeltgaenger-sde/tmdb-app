import { FilmographyCell } from "@features";
import "./styles/FilmographyRow.scss";

export const FilmographyRow = ({ year, medias }) => {
  return (
    <div className="filmography-row">
      <h3 className="filmography-row__title">{year}</h3>

      <div className="filmography-row__items">
        {medias.map(media => (
          <FilmographyCell key={media.id} {...media} />
        ))}
      </div>
    </div>
  );
};
