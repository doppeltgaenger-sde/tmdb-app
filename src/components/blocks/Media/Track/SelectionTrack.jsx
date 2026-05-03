import { useEffect, useState } from "react";
import { useViewport } from "@hooks";
import { classNames } from "@utils";
import { CreditCard } from "@blocks";
import { Slider } from "@shared";
import "./styles/SelectionTrack.scss";

const INITIAL_ITEMS = 8;
const FULL_ITEMS = 20;

export const SelectionTrack = ({
  className,
  title,
  items = [],
  CardComponent = CreditCard,
}) => {
  const [visibleCount, setVisibleCount] = useState(INITIAL_ITEMS);
  const { isMobileLg, isTablet } = useViewport();

  const priorityThreshold = isMobileLg ? 3 : isTablet ? 5 : 8;

  useEffect(() => {
    setVisibleCount(INITIAL_ITEMS);

    if (!items.length) return;

    let id;
    const updateCount = () => setVisibleCount(FULL_ITEMS);

    if ("requestIdleCallback" in window) {
      id = requestIdleCallback(updateCount);
    } else {
      id = setTimeout(updateCount, 200);
    }

    return () => {
      if ("cancelIdleCallback" in window) cancelIdleCallback(id);
      else clearTimeout(id);
    };
  }, [items.length]);

  const renderContent = () => {
    if (!items.length) {
      return [...Array(INITIAL_ITEMS)].map((_, index) => (
        <CardComponent key={`skeleton-${index}`} isSkeleton />
      ));
    }

    return items.slice(0, visibleCount).map((item, index) => (
      <CardComponent
        key={item.id || index}
        {...item}
        isPriority={index < priorityThreshold}
      />
    ));
  };

  return (
    <section className={classNames(["selection-track", className])}>
      <h2 className="selection-track__title">{title}</h2>

      <div className="selection-track__content">
        <Slider variant="selection">
          {renderContent()}
        </Slider>
      </div>
    </section>
  );
};
