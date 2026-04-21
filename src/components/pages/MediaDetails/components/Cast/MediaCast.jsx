import { SelectionTrack } from "@blocks";
import "./styles/MediaCast.scss";

export const MediaCast = ({ cast }) => {
  return (
    <section className="media-cast">
      <SelectionTrack
        title="Top Billed Cast"
        items={cast}
      />
    </section>
  );
};
