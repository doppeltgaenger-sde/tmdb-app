import { SelectionTrack, BackdropCard } from "@features";
import "./styles/MediaRecommendations.scss";

export const MediaRecommendations = ({ recommendations }) => {
  return (
    <section className="media-recommendations">
      <SelectionTrack
        className="media-recommendations__items"
        title="Recommended"
        items={recommendations}
        CardComponent={BackdropCard}
      />
    </section>
  );
};
