import React, { useEffect, useState, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { useViewport } from "@hooks";
import { classNames } from "@utils";
import { Icon } from "@shared";
import "./styles/Slider.scss";

const DRAG_RESET_DELAY = 200;

export const Slider = ({
  children,
  className,
  resetOnChange,
  options = {},
}) => {
  const { isMobileLg } = useViewport();

  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "center",
    dragFree: true,
    slidesToScroll: "auto",
    containScroll: "trimSnaps",
    ...options,
  });

  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  const updateNavigationState = useCallback(() => {
    if (!emblaApi) return;

    const prev = emblaApi.canScrollPrev();
    const next = emblaApi.canScrollNext();

    setCanScrollPrev((p) => (p !== prev ? prev : p));
    setCanScrollNext((n) => (n !== next ? next : n));
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;

    updateNavigationState();

    emblaApi.on("select", updateNavigationState);
    emblaApi.on("reInit", updateNavigationState);

    return () => {
      emblaApi.off("select", updateNavigationState);
      emblaApi.off("reInit", updateNavigationState);
    };
  }, [emblaApi, updateNavigationState]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.scrollTo(0);
  }, [resetOnChange, emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;

    const rootNode = emblaApi.rootNode();

    const handlePointerDown = () => {
      rootNode.classList.add("slider__body--dragging");
    };

    const handlePointerUp = () => {
      setTimeout(() => {
        rootNode.classList.remove("slider__body--dragging");
      }, DRAG_RESET_DELAY);
    };

    emblaApi.on("pointerDown", handlePointerDown);
    emblaApi.on("pointerUp", handlePointerUp);

    return () => {
      emblaApi.off("pointerDown", handlePointerDown);
      emblaApi.off("pointerUp", handlePointerUp);
    };
  }, [emblaApi]);

  return (
    <div className={classNames(["slider", className])}>
      <div ref={emblaRef} className="slider__body">
        <div className="slider__items">
          {React.Children.map(children, (child) => (
            <div className="slider__item">{child}</div>
          ))}
        </div>
      </div>

      {!isMobileLg && 
        <>
          <button
            className={classNames([
              "slider__button",
              "slider__button--prev",
              !canScrollPrev && "slider__button--disabled",
            ])}
            onClick={() => emblaApi?.scrollPrev()}
            disabled={!canScrollPrev}
            aria-label="Previous slide"
          >
            <Icon className="slider__button-icon" name="chevron-left" />
          </button>

          <button
            className={classNames([
              "slider__button",
              "slider__button--next",
              !canScrollNext && "slider__button--disabled",
            ])}
            onClick={() => emblaApi?.scrollNext()}
            disabled={!canScrollNext}
            aria-label="Next slide"
          >
            <Icon className="slider__button-icon" name="chevron-right" />
          </button>
        </>
      }
    </div>
  );
};
