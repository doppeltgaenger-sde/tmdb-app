import { useEffect, useRef, useState, useCallback } from "react";
import { classNames } from "@utils";
import { Slider, Tabs } from "@shared";
import { PosterCard } from "@blocks";
import "./styles/MediaTrack.scss";

const SKELETON_COUNT = 8;
const INITIAL_ITEMS = 8;
const FULL_ITEMS = 20;

const TRACK_VARIANTS = {
  default: {
    tabsVariant: "default",
  },
  trailers: {
    tabsVariant: "inverted",
  },
};

export const MediaTrack = (props) => {
  const {
    title,
    items = [],
    tabs,
    activeTab,
    onTabChange,
    onCardHover,
    onCardActivate,
    CardComponent = PosterCard,
    variant = "default",
  } = props;

  const config = TRACK_VARIANTS[variant] || TRACK_VARIANTS.default;

  const containerRef = useRef(null);
  const [displayItems, setDisplayItems] = useState(items);
  const [visibleCount, setVisibleCount] = useState(INITIAL_ITEMS);
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    setIsFadingOut(true);
  }, [activeTab]);

  useEffect(() => {
    if (!isFadingOut) return;

    const node = containerRef.current;
    if (!node) return;

    let handled = false;

    const handleTransitionEnd = (e) => {
      if (e.target !== node) return;
      if (e.propertyName !== "opacity") return;

      handled = true;

      setDisplayItems(items);
      setIsFadingOut(false);
    };

    node.addEventListener("transitionend", handleTransitionEnd);

    const fallback = setTimeout(() => {
      if (handled) return;

      setDisplayItems(items);
      setIsFadingOut(false);
    }, 300);

    return () => {
      node.removeEventListener("transitionend", handleTransitionEnd);
      clearTimeout(fallback);
    };
  }, [isFadingOut, items]);

  useEffect(() => {
    if (!displayItems.length) return;

    setVisibleCount(INITIAL_ITEMS);

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
      if ("cancelIdleCallback" in window) {
        cancelIdleCallback(id);
      } else {
        clearTimeout(id);
      }
    };
  }, [displayItems]);

  const handleHover = useCallback(
    (item) => onCardHover?.(item),
    [onCardHover],
  );

  const handleActivate = useCallback(
    (item) => onCardActivate?.(item),
    [onCardActivate],
  );

  const renderMedia = () => {
    if (!displayItems.length) {
      return [...Array(SKELETON_COUNT)].map((_, index) => (
        <CardComponent key={index} isSkeleton />
      ));
    }

    const visibleItems = displayItems.slice(0, visibleCount);

    return visibleItems.map((item) => (
      <CardComponent
        key={item.id}
        {...item}
        onMouseEnter={() => handleHover(item)}
        onClick={() => handleActivate(item)}
      />
    ));
  };

  return (
    <div className={classNames(["media-track", `media-track--${variant}`])}>
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
      >
        <Slider resetOnChange={activeTab}>
          {renderMedia()}
        </Slider>
      </div>
    </div>
  );
};
