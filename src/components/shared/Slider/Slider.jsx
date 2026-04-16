import React, { useEffect, useState, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { classNames } from "@utils";
import "./styles/Slider.scss";

export const Slider = ({
  children,
  className,
  resetOnChange,
  options = {},
  variant,
  onScrollStateChange,
}) => {
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
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;

    updateNavigationState();

    emblaApi.on("select", updateNavigationState);
    emblaApi.on("scroll", updateNavigationState); 
    emblaApi.on("reInit", updateNavigationState);

    return () => {
      emblaApi.off("select", updateNavigationState);
      emblaApi.off("scroll", updateNavigationState);
      emblaApi.off("reInit", updateNavigationState);
    };
  }, [emblaApi, updateNavigationState]);

  useEffect(() => {
    if (!emblaApi || !onScrollStateChange) return;

    const handleScrollStart = () => onScrollStateChange(true);
    const handleScrollEnd = () => onScrollStateChange(false);

    emblaApi.on("pointerDown", handleScrollStart);
    emblaApi.on("settle", handleScrollEnd);

    return () => {
      emblaApi.off("pointerDown", handleScrollStart);
      emblaApi.off("settle", handleScrollEnd);
    };
  }, [emblaApi, onScrollStateChange]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.scrollTo(0);
  }, [resetOnChange, emblaApi]);

  return (
    <div 
    className={classNames([
      "slider", 
      `slider--${variant}`,
      className,
    ])}
    >
      <div 
        className={classNames([
          "slider__overlay slider__overlay--left", 
          canScrollPrev && "slider__overlay--visible"
        ])} 
      />

      <div ref={emblaRef} className="slider__body">
        <div className="slider__items">
          {React.Children.map(children, (child) => (
            <div className="slider__item">{child}</div>
          ))}
        </div>
      </div>

      <div 
        className={classNames([
          "slider__overlay slider__overlay--right", 
          canScrollNext && "slider__overlay--visible",
        ])}
      />
    </div>
  );
};
