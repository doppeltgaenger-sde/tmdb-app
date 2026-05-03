import { SelectionTrack } from "@blocks";
import "./styles/CollectionCast.scss";

export const CollectionCast = ({ cast }) => {
  return (
    <section className="collection-cast">
      <SelectionTrack
        className="collection-cast__items"
        title="Featured Cast"
        items={cast}
      />
    </section>
  );
};
