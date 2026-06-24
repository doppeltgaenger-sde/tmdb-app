export const formatNumber = (value = 0, { locale = "en-US", compact = false } = {}) => {
  return new Intl.NumberFormat(locale, {
    notation: compact ? "compact" : "standard",
    compactDisplay: "short",
  }).format(value);
};
