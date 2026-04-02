import { useState, useEffect } from "react";
import { classNames, getInitials } from "@utils";
import "./styles/Avatar.scss";

const sizeMap = {
  sm: 48,
  md: 56,
  lg: 64,
};

export const Avatar = (props) => {
  const { 
    className, 
    src, 
    name, 
    color, 
    size = "md",
  } = props;

  const [imgError, setImgError] = useState(false);

  const dimension =
    typeof size === "number" ? size : sizeMap[size] || sizeMap.md;

  const showFallback = !src || imgError;

  useEffect(() => {
    setImgError(false);
  }, [src]);

  const handleError = () => {
    setImgError(true);
  };

  return (
    <div
      className={classNames(["avatar", className])}
      style={{
        minWidth: dimension,
        maxWidth: dimension,
        minHeight: dimension,
        maxHeight: dimension,
        backgroundColor: showFallback ? color : "transparent",
      }}
    >
      {showFallback ? (
        <span className="avatar__initials">
          {getInitials(name?.trim() || "?")}
        </span>
      ) : (
        <img
          className="avatar__image"
          src={src}
          alt={name || "tmdb user avatar"}
          onError={handleError}
        />
      )}
    </div>
  );
};
