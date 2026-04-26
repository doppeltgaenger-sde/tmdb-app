import { useEffect, useRef, useState, useCallback } from "react";
import { useViewport } from "@hooks";
import { classNames } from "@utils";
import { PosterCard } from "@blocks";
import { Slider, Tabs } from "@shared";
import "./styles/MediaTrack.scss";

const INITIAL_ITEMS = 8;
const FULL_ITEMS = 20;
const MIN_LOADING_TIME = 500; 

const TRACK_VARIANTS = {
  default: { tabsVariant: "default" },
  trailers: { tabsVariant: "inverted", sliderVariant: "inverted" },
  selection: { sliderVariant: "selection" },
};

export const MediaTrack = ({
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
  variant = "default",
}) => {
  const config = TRACK_VARIANTS[variant] || TRACK_VARIANTS.default;
  const containerRef = useRef(null);
  const [displayItems, setDisplayItems] = useState([]);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [visibleCount, setVisibleCount] = useState(INITIAL_ITEMS);
  const loadingStartTimeRef = useRef(null);
  const { isMobileLg, isTablet } = useViewport();

  const priorityThreshold = isMobileLg ? 3 : isTablet ? 5 : 8;

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
        setVisibleCount(INITIAL_ITEMS);
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
      setDisplayItems(items);
      setIsFadingOut(false);
    }, MIN_LOADING_TIME + 300);

    return () => {
      node.removeEventListener("transitionend", handleTransitionEnd);
      clearTimeout(fallback);
    };
  }, [isFadingOut, items]);

  useEffect(() => {
    if (isFadingOut || !displayItems.length) return;

    let id;

    if ("requestIdleCallback" in window) {
      id = requestIdleCallback(() => {
        setVisibleCount(FULL_ITEMS);
      });
    } else {
      id = setTimeout(() => {
        setVisibleCount(FULL_ITEMS);
      }, 200);
    }

    return () => {
      if ("cancelIdleCallback" in window) cancelIdleCallback(id);
      else clearTimeout(id);
    };
  }, [isFadingOut, displayItems]);

  const handleHover = useCallback((item) => onCardHover?.(item), [onCardHover]);
  const handleActivate = useCallback((item) => onCardActivate?.(item), [onCardActivate]);

  const renderContent = () => {
    if (!displayItems.length) {
      return [...Array(INITIAL_ITEMS)].map((_, index) => (
        <CardComponent key={`skeleton-${index}`} isSkeleton />
      ));
    }

    const visibleItems = displayItems.slice(0, visibleCount);

    return visibleItems.map((item, index) => (
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
    <div 
      className={classNames([
        "media-track", 
        `media-track--${variant}`,
        className,
      ])}
    >
      <div className="media-track__title-block">
        <h2 className="media-track__title">{title}</h2>
        {tabs && (
          <Tabs
            className="media-track__tabs"
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
          "media-track__items",
          isFadingOut && "media-track__items--fading",
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
