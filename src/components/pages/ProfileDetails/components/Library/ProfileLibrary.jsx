import { SelectionTrack, PosterCard } from "@features";
import "./styles/ProfileLibrary.scss";

export const ProfileLibrary = ({ library }) => {
  return (
    <section className="profile-library">
      <SelectionTrack
        className="profile-library__items"
        title="Known For"
        items={library}
        CardComponent={PosterCard}
        cardName="PosterCard"
      />
    </section>
  );
};
