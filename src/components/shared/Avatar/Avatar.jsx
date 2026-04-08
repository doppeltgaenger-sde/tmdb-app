import { memo, useState, useEffect, useMemo, useCallback } from "react";
import { classNames, getInitials } from "@utils";
import "./styles/Avatar.scss";

export const Avatar = memo(({ className, src, name, color, size = "md" }) => {
  const [imgError, setImgError] = useState(false);
  const showFallback = !src || imgError;

  const initials = useMemo(() => {
    return getInitials(name?.trim() || "?");
  }, [name]);

  const styles = useMemo(
    () => ({
      backgroundColor: showFallback ? color : "transparent",
    }),
    [showFallback, color],
  );

  useEffect(() => {
    setImgError(false);
  }, [src]);

  const handleError = useCallback(() => {
    setImgError(true);
  }, []);

  return (
    <div
      className={classNames(["avatar", `avatar--${size}`, className])}
      style={styles}
    >
      {showFallback ? (
        <span className="avatar__initials">{initials}</span>
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
