import { MediaPlate } from "@blocks";
import "./styles/CollectionList.scss";

export const CollectionList = ({ collectionList }) => {
  if (!collectionList.length) return null;

  return (
    <section className="collection-list">
      <h2 className="collection-list__title">{collectionList.length} movies</h2>

      <MediaPlate 
      className="collection-list__items" 
      variant="list"
      plates={collectionList} 
      />
    </section>
  );
};
