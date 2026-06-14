import { FilmographyTable } from "@features";
import "./styles/ProfileFilmography.scss";

export const ProfileFilmography = ({ filmography }) => {
  return (
    <section className="profile-filmography">
      <h2 className="profile-filmography__title">Filmography</h2>

      <FilmographyTable items={filmography} />
    </section>
  );
};
