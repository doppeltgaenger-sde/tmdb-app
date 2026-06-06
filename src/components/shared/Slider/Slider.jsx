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
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState([]);

  const isDots = variant === "dots";

  const updateNavigationState = useCallback(() => {
    if (!emblaApi) return;

    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;

    setScrollSnaps(emblaApi.scrollSnapList());
    updateNavigationState();

    emblaApi.on("select", updateNavigationState);
    emblaApi.on("scroll", updateNavigationState); 
    emblaApi.on("reInit", () => {
      setScrollSnaps(emblaApi.scrollSnapList());
      updateNavigationState();
    });

    return () => {
      emblaApi.off("select", updateNavigationState);
      emblaApi.off("scroll", updateNavigationState);
    };
  }, [emblaApi, updateNavigationState]);

  const scrollTo = useCallback((index) => {
    if (emblaApi) emblaApi.scrollTo(index);
  }, [emblaApi]);

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
    <div className={classNames(["slider", `slider--${variant}`, className])}>
      {!isDots &&   
        <div 
          className={classNames([
            "slider__overlay slider__overlay--left", 
            canScrollPrev && "slider__overlay--visible"
          ])} 
        />
      }

      <div ref={emblaRef} className="slider__body">
        <div className="slider__items">
          {React.Children.map(children, (child) => (
            <div className="slider__item">{child}</div>
          ))}
        </div>
      </div>
      
      {!isDots &&
        <div 
          className={classNames([
            "slider__overlay slider__overlay--right", 
            canScrollNext && "slider__overlay--visible",
          ])}
        />
      }

      {isDots && scrollSnaps.length > 1 && (
        <div className="slider__dots">
          {scrollSnaps.map((_, index) => (
            <div
              key={index}
              className={classNames([
                "slider__dot",
                index === selectedIndex && "slider__dot--active"
              ])}
              onClick={() => scrollTo(index)}
            />
          ))}
        </div>
      )}
    </div>
  );
};
