import { SelectionTrack } from "@features";
import "./styles/MediaCast.scss";

export const MediaCast = ({ cast }) => {
  return (
    <section className="media-cast">
      <SelectionTrack
        className="media-cast__items"
        title="Top Billed Cast"
        items={cast}
      />
    </section>
  );
};
