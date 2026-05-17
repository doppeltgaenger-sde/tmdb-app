import { useViewport } from "@hooks";
import { DetailsPlate } from "@features";
import { classNames } from "@utils";
import "./styles/ProviderList.scss"

export const ProviderList = ({ mediaList = [], pageLoading }) => {
  const { isMobileLg } = useViewport();

  if (!mediaList.length) return null;

  return (
    <section className="provider-list">
      <DetailsPlate 
        className={classNames([
          "provider-list__items",
          pageLoading && "provider-list__items--fading",
        ])} 
        variant={isMobileLg ? "list" : "grid"}
        columns={!isMobileLg && "2"}
        plates={mediaList} 
      />
    </section>
  );
};
