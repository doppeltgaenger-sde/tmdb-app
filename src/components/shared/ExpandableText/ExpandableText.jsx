import { useState, useRef, useLayoutEffect } from "react";
import { classNames } from "@utils";
import { Button } from "@shared";
import "./styles/ExpandableText.scss";

export const ExpandableText = ({ 
  className,
  children, 
  collapsedHeight = 125, 
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isTruncated, setIsTruncated] = useState(false);
  const [fullHeight, setFullHeight] = useState(0);
  const textRef = useRef(null);

  useLayoutEffect(() => {
    const element = textRef.current;
    if (!element) return;

    const resizeObserver = new ResizeObserver((entries) => {
      for (let entry of entries) {
        const scrollHeight = entry.target.scrollHeight;
        
        setFullHeight(scrollHeight);
        setIsTruncated(scrollHeight > collapsedHeight);
      }
    });

    resizeObserver.observe(element);
    return () => resizeObserver.disconnect();
  }, [children, collapsedHeight]);

  return (
    <div className={classNames(["expandable-text", className])}>
      <div 
        ref={textRef}
        className={classNames([
          "expandable-text__content", 
          isExpanded && "expandable-text__content--expanded",
          isTruncated && !isExpanded && "expandable-text__content--truncated"
        ])}
        style={{ 
          maxHeight: isExpanded ? `${fullHeight}px` : `${collapsedHeight}px` 
        }}
      >
        {children}
      </div>

      {isTruncated && (
        <Button
          className={classNames([
            "expandable-text__button", 
            isExpanded && "expandable-text__button--expanded",
          ])}
          variant="overlay"
          theme="dark"
          onClick={() => setIsExpanded(!isExpanded)}
          iconRight="chevron-down"
        >
          {isExpanded ? "Hide" : "Read the rest"}
        </Button>
      )}
    </div>
  );
};
