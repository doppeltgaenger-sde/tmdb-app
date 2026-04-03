import { memo, useState, useEffect, useMemo, useCallback } from "react";
import { classNames, getInitials } from "@utils";
import "./styles/Avatar.scss";

const sizeMap = {
  sm: 48,
  md: 56,
  lg: 64,
};

export const Avatar = memo((props) => {
  const { 
    className, 
    src, 
    name, 
    color, 
    size = "md",
  } = props;

  const [imgError, setImgError] = useState(false);

  const dimension = useMemo(() => {
    return typeof size === "number"
      ? size
      : sizeMap[size] || sizeMap.md;
  }, [size]);

  const showFallback = !src || imgError;

  const initials = useMemo(() => {
    return getInitials(name?.trim() || "?");
  }, [name]);

  const styles = useMemo(() => ({
    minWidth: dimension,
    maxWidth: dimension,
    minHeight: dimension,
    maxHeight: dimension,
    backgroundColor: showFallback ? color : "transparent",
  }), [dimension, showFallback, color]);

  useEffect(() => {
    setImgError(false);
  }, [src]);

  const handleError = useCallback(() => {
    setImgError(true);
  }, []);

  return (
    <div className={classNames(["avatar", className])} style={styles}>
      {showFallback ? (
        <span className="avatar__initials">
          {initials}
        </span>
      ) : (
        <img
          className="avatar__image"
          src={src}
          alt={name || "tmdb user avatar"}
          onError={handleError}
          loading="lazy"
        />
      )}
    </div>
  );
});
