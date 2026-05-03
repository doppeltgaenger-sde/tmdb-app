import { SelectionTrack } from "@blocks";
import "./styles/CollectionCrew.scss";

export const CollectionCrew = ({ crew }) => {
  return (
    <section className="collection-crew">
      <SelectionTrack
        className="collection-crew__items"
        title="Featured Crew"
        items={crew}
      />
    </section>
  );
};
