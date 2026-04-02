import React, { useEffect, useState, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { classNames } from "@utils";
import { Icon } from "@shared";
import "./styles/Slider.scss";

const DRAG_RESET_DELAY = 200;

export const Slider = (props) => {
  const { 
    children, 
    className, 
    resetOnChange, 
    options = {},
  } = props;

  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "center",
    dragFree: true,
    slidesToScroll: "auto",
    containScroll: "trimSnaps",
    ...options,
  });

  const [canScrollPrev, setСanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const updateNavigationState = useCallback(() => {
    if (!emblaApi) return;
    setСanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
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

    const handlePointerDown = () => {
      setIsDragging(true);
    };

    const handlePointerUp = () => {
      setTimeout(() => {
        setIsDragging(false);
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
    <div
      className={classNames([
        "slider",
        isDragging && "slider--dragging",
        className,
      ])}
    >
      <div ref={emblaRef} className="slider__body">
        <div className="slider__items">
          {React.Children.map(children, (child, index) => (
            <div className="slider__item" key={index}>
              {child}
            </div>
          ))}
        </div>
      </div>

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
    </div>
  );
};
