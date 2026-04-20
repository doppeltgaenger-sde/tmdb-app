import { SelectionTrack } from "@blocks";
import "./styles/MediaCast.scss";

export const MediaCast = ({cast}) => {
  return (
    <section className="media-cast">
        <div className="media-cast__body">
          <SelectionTrack
            title="Top Billed Cast"
            items={cast}
          />
        </div>
    </section>
  );
};
