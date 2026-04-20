import { useEffect, useState } from "react";
import { useViewport } from "@hooks";
import { CastCard } from "@blocks";
import { Slider } from "@shared";
import "./styles/SelectionTrack.scss";

const INITIAL_ITEMS = 8;
const FULL_ITEMS = 20;

export const SelectionTrack = ({
  title,
  items = [],
  CardComponent = CastCard,
}) => {
  const [displayItems, setDisplayItems] = useState([]);
  const [visibleCount, setVisibleCount] = useState(INITIAL_ITEMS);
  const { isMobileLg, isTablet } = useViewport();

  const priorityThreshold = isMobileLg ? 3 : isTablet ? 5 : 8;

  useEffect(() => {
    setDisplayItems(items);
    setVisibleCount(INITIAL_ITEMS);
  }, [items]);

  useEffect(() => {
    if (!displayItems.length) return;

    let id;

    if ("requestIdleCallback" in window) {
      id = requestIdleCallback(() => setVisibleCount(FULL_ITEMS));
    } else {
      id = setTimeout(() => setVisibleCount(FULL_ITEMS), 200);
    }

    return () => {
      if ("cancelIdleCallback" in window) cancelIdleCallback(id);
      else clearTimeout(id);
    };
  }, [displayItems]);

  const renderContent = () => {
    if (!displayItems.length) {
      return [...Array(INITIAL_ITEMS)].map((_, index) => (
        <CardComponent key={`skeleton-${index}`} isSkeleton />
      ));
    }

    return displayItems.slice(0, visibleCount).map((item, index) => (
      <CardComponent
        key={item.id || index}
        {...item}
        isPriority={index < priorityThreshold}
      />
    ));
  };

  return (
    <section className="selection-track">
      <h2 className="selection-track__title">{title}</h2>

      <div className="selection-track__content">
        <Slider variant="selection">
          {renderContent()}
        </Slider>
      </div>
    </section>
  );
};
