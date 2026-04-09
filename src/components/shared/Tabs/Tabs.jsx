import {
  useRef,
  useEffect,
  useLayoutEffect,
  useState,
  useMemo,
  useCallback,
} from "react";
import { useViewport } from "@hooks";
import { classNames } from "@utils";
import { Icon } from "@shared";
import "./styles/Tabs.scss";

export const Tabs = ({
  className,
  items = [],
  active,
  onChange,
  renderLabel,
  variant = "default",
}) => {
  const containerRef = useRef(null);
  const dropdownRef = useRef(null);
  const { isMobileLg } = useViewport();
  const [isOpen, setIsOpen] = useState(false);
  const [indicator, setIndicator] = useState({
    width: 0,
    left: 0,
  });
  const viewMode = isMobileLg ? "dropdown" : "tabs";

  const normalizedItems = useMemo(() => {
    return items.map((item) => {
      const value = typeof item === "string" ? item : item.value;

      const label =
        renderLabel?.(item) ?? (typeof item === "string" ? item : item.label);

      return { value, label };
    });
  }, [items, renderLabel]);

  const activeItem = normalizedItems.find((item) => item.value === active);

  const updateIndicator = useCallback(() => {
    if (viewMode !== "tabs") return;

    const container = containerRef.current;
    if (!container) return;

    const activeTab = container.querySelector(`[data-value="${active}"]`);

    if (!activeTab) return;

    setIndicator({
      width: activeTab.offsetWidth,
      left: activeTab.offsetLeft,
    });
  }, [active, viewMode]);

  useLayoutEffect(() => {
    updateIndicator();
  }, [updateIndicator, normalizedItems]);

  useEffect(() => {
    const handleResize = () => updateIndicator();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [updateIndicator]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!dropdownRef.current) return;

      if (!dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };

    document.addEventListener("keydown", handleKey);

    return () => {
      document.removeEventListener("keydown", handleKey);
    };
  }, []);

  const handleSelect = (value) => {
    onChange(value);
    setIsOpen(false);
  };

  if (viewMode === "dropdown") {
    return (
      <div
        ref={dropdownRef}
        className={classNames([
          "tabs-dropdown",
          `tabs-dropdown--${variant}`,
          isOpen && "tabs-dropdown--open",
          className,
        ])}
      >
        <button
          className={classNames([
            "tabs-dropdown__item",
            "tabs-dropdown__item--active",
            "tabs-dropdown__item--trigger",
          ])}
          onClick={() => setIsOpen((prev) => !prev)}
        >
          <span className="tabs-dropdown__label">{activeItem?.label}</span>

          <Icon className="tabs-dropdown__icon" name="chevron-tab" />
        </button>

        {isOpen && 
          <div
            className={classNames([
              "tabs-dropdown__items",
              isOpen && "tabs-dropdown__items--open",
            ])}
          >
            {normalizedItems.map((item) => (
              <button
                key={item.value}
                className={classNames([
                  "tabs-dropdown__item",
                  item.value === active && "tabs-dropdown__item--active",
                ])}
                onClick={() => handleSelect(item.value)}
              >
                <span className="tabs-dropdown__label">{item.label}</span>

                {item.value === active && 
                  <Icon className="tabs-dropdown__icon" name="chevron-tab" />
                }
              </button>
            ))}
          </div>
        }
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className={classNames(["tabs", `tabs--${variant}`, className])}
    >
      <div
        className="tabs__indicator"
        style={{
          width: indicator.width,
          transform: `translateX(${indicator.left}px)`,
        }}
      />

      {normalizedItems.map((item) => (
        <button
          key={item.value}
          data-value={item.value}
          className={classNames([
            "tabs__item",
            active === item.value && "tabs__item--active",
          ])}
          onClick={() => onChange(item.value)}
        >
          <span className="tabs__label">{item.label}</span>
        </button>
      ))}
    </div>
  );
};
