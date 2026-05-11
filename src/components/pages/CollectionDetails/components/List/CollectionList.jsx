import { DetailsPlate } from "@features";

export const CollectionList = ({ mediaList }) => {
  if (!mediaList.length) return null;

  return (
    <section className="collection-list">
      <h2 className="collection-list__title">{mediaList.length} movies</h2>

      <DetailsPlate 
        className="collection-list__items" 
        variant="list"
        plates={mediaList} 
      />
    </section>
  );
};
