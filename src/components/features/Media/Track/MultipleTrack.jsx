import { useEffect, useRef, useState, useCallback } from "react";
import { classNames, getCardCount } from "@utils";
import { PosterCard } from "@features";
import { Slider, Tabs } from "@shared";
import "./styles/MultipleTrack.scss";

const INITIAL_ITEMS = 8;
const FULL_ITEMS = 20;
const MIN_LOADING_TIME = 500;

const TRACK_VARIANTS = {
  default: { tabsVariant: "default" },
  trailers: { tabsVariant: "inverted", sliderVariant: "inverted" },
  selection: { sliderVariant: "selection" },
};

export const MultipleTrack = ({
  className,
  title,
  items = [],
  tabs,
  activeTab,
  onTabChange,
  onCardHover,
  onCardActivate,
  onScrollStateChange,
  CardComponent = PosterCard,
  cardName = "PosterCard",
  variant = "default",
  dataType = "default",
}) => {
  const config = TRACK_VARIANTS[variant] || TRACK_VARIANTS.default;
  const containerRef = useRef(null);
  
  const [containerWidth, setContainerWidth] = useState(0);
  const [isInitialized, setIsInitialized] = useState(false);
  const [displayItems, setDisplayItems] = useState([]);
  const [isFadingOut, setIsFadingOut] = useState(false);
  
  const priorityThreshold = isInitialized 
    ? getCardCount(cardName, dataType, containerWidth) 
    : INITIAL_ITEMS;
  const initialCount = isInitialized ? priorityThreshold + 2 : INITIAL_ITEMS;
  
  const [visibleCount, setVisibleCount] = useState(initialCount);
  const loadingStartTimeRef = useRef(null);

  useEffect(() => {
    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        setContainerWidth(entry.contentRect.width);
        setIsInitialized(true);
      }
    });

    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    setIsFadingOut(true);
    loadingStartTimeRef.current = Date.now();
  }, [activeTab, items]);

  useEffect(() => {
    if (!isFadingOut) return;

    const node = containerRef.current;
    if (!node) return;

    const handleTransitionEnd = (e) => {
      if (e.target !== node || e.propertyName !== "opacity") return;

      const timePassed = Date.now() - loadingStartTimeRef.current;
      const remainingTime = Math.max(0, MIN_LOADING_TIME - timePassed);

      setTimeout(() => {
        setVisibleCount(initialCount);
        setDisplayItems(items);

        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            setIsFadingOut(false);
          });
        });
      }, remainingTime);
    };

    node.addEventListener("transitionend", handleTransitionEnd);
    
    const fallback = setTimeout(() => {
      setVisibleCount(initialCount);
      setDisplayItems(items);
      setIsFadingOut(false);
    }, MIN_LOADING_TIME + 300);

    return () => {
      node.removeEventListener("transitionend", handleTransitionEnd);
      clearTimeout(fallback);
    };
  }, [isFadingOut, items, initialCount]);

  useEffect(() => {
    if (isFadingOut || !displayItems.length) return;

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
  }, [isFadingOut, displayItems]);

  const handleHover = useCallback((item) => onCardHover?.(item), [onCardHover]);
  const handleActivate = useCallback((item) => onCardActivate?.(item), [onCardActivate]);

  const renderContent = () => {
    if (!displayItems.length || !isInitialized) {
      return [...Array(INITIAL_ITEMS)].map((_, index) => (
        <CardComponent key={`skeleton-${index}`} isSkeleton />
      ));
    }

    return displayItems.slice(0, visibleCount).map((item, index) => (
      <CardComponent
        key={item.id}
        {...item}
        onMouseEnter={() => handleHover(item)}
        onClick={() => handleActivate(item)}
        isPriority={index < priorityThreshold}
      />
    ));
  };

  return (
    <div className={classNames([
      "multiple-track", 
      `multiple-track--${variant}`, 
      className])}
    >
      <div className="multiple-track__title-block">
        <h2 className="multiple-track__title">{title}</h2>
        {tabs && (
          <Tabs
            className="multiple-track__tabs"
            items={tabs}
            active={activeTab}
            onChange={onTabChange}
            variant={config.tabsVariant}
          />
        )}
      </div>

      <div
        ref={containerRef}
        className={classNames([
          "multiple-track__items", 
          isFadingOut && "multiple-track__items--fading"
        ])}
        style={{ 
          transition: "opacity 0.4s cubic-bezier(0.4, 0, 0.2, 1)", 
          willChange: "opacity" 
        }}
      >
        <Slider 
          resetOnChange={activeTab}
          variant={config.sliderVariant}
          onScrollStateChange={onScrollStateChange}
        >
          {renderContent()}
        </Slider>
      </div>
    </div>
  );
};
