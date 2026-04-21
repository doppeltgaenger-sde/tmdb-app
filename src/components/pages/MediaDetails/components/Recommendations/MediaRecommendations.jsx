import { SelectionTrack, BackdropCard } from "@blocks";
import "./styles/MediaRecommendations.scss";

export const MediaRecommendations = ({ recommendations }) => {
  return (
    <section className="media-recommendations">
        <div className="media-recommendations__body">
          <SelectionTrack
            className="media-recommendations__items"
            title="Recommended"
            items={recommendations}
            CardComponent={BackdropCard}
          />
        </div>
    </section>
  );
};
