import { useViewport } from "@hooks";
import { Plate } from "@layout";
import { classNames } from "@utils";
import { ProfileCard } from "@features"
import "./styles/PeopleList.scss"

export const PeopleList = ({ peopleList = [], pageLoading }) => {
  const { 
    isMobileSm, 
    isMobileLg, 
    isTablet,
    isDesktop,
  } = useViewport();

  if (!peopleList.length) return null;

  const mappedPeopleList = peopleList.map((person, index) => ({
    ...person,
    variant: "fluid",
    isPriority: 
      (isMobileSm && index < 2)
      || (isMobileLg && index < 4)
      || (isTablet && index < 6)
      || (isDesktop && index < 8),
  }));

  const getColumns = () => {
    if (isMobileLg) return "2";
    if (isTablet) return "3";
    if (isDesktop) return "4";
    return undefined;
  };

  return (
    <section className="people-list">
      <Plate 
        className={classNames([
          "people-list__items",
          pageLoading && "people-list__items--fading",
        ])} 
        variant={isMobileSm ? "list" : "grid"}
        columns={getColumns()}
        plates={mappedPeopleList} 
        CardComponent={ProfileCard}
      />
    </section>
  );
};
