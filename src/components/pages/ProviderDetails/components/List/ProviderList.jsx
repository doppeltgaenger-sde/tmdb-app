import { useViewport } from "@hooks";
import { DetailsPlate } from "@features";

export const ProviderList = ({ mediaList }) => {
  const { isMobileLg } = useViewport();

  if (!mediaList.length) return null;

  return (
    <section className="provider-list">
      <DetailsPlate 
        className="provider-list__items" 
        variant={isMobileLg ? "list" : "grid"}
        columns={!isMobileLg && "2"}
        plates={mediaList} 
      />
    </section>
  );
};
