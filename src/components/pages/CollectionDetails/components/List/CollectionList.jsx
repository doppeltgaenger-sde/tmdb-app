import { Plate } from "@layout";

export const CollectionList = ({ mediaList }) => {
  if (!mediaList.length) return null;

  return (
    <section className="collection-list">
      <h2 className="collection-list__title">{mediaList.length} movies</h2>

      <Plate 
        className="collection-list__items" 
        variant="list"
        plates={mediaList} 
      />
    </section>
  );
};
