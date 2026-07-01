import { useEffect, useState, useRef } from "react";
import { classNames, getCardCount } from "@utils";
import { ProfileCard } from "@features";
import { Slider } from "@shared";
import "./styles/SelectionTrack.scss";

const INITIAL_ITEMS = 8;
const FULL_ITEMS = 20;

export const SelectionTrack = ({
  className,
  title,
  items = [],
  CardComponent = ProfileCard,
  cardName = "ProfileCard",
  dataType = "default",
}) => {
  const contentRef = useRef(null);
  const [containerWidth, setContainerWidth] = useState(0);
  const [isInitialized, setIsInitialized] = useState(false);
  
  const priorityThreshold = isInitialized 
    ? getCardCount(cardName, dataType, containerWidth) 
    : INITIAL_ITEMS;
  const initialCount = isInitialized ? priorityThreshold + 2 : INITIAL_ITEMS;

  const [visibleCount, setVisibleCount] = useState(initialCount);

  useEffect(() => {
    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        setContainerWidth(entry.contentRect.width);
        setIsInitialized(true);
      }
    });

    if (contentRef.current) observer.observe(contentRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    setVisibleCount(initialCount);

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
  }, [items.length, initialCount]);

  const renderContent = () => {
    if (!items.length || !isInitialized) {
      return [...Array(INITIAL_ITEMS)].map((_, index) => (
        <CardComponent key={`skeleton-${index}`} isSkeleton />
      ));
    }

    return items.slice(0, visibleCount).map((item, index) => (
      <CardComponent
        key={item.id || index}          
        variant="fixed"
        {...item}
        isPriority={index < priorityThreshold}
      />
    ));
  };

  return (
    <section className={classNames(["selection-track", className])}>
      <h2 className="selection-track__title">{title}</h2>

      <div className="selection-track__content" ref={contentRef}>
        <Slider variant="selection">
          {renderContent()}
        </Slider>
      </div>
    </section>
  );
};
