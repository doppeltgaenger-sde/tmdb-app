export const formatNumber = (value = 0, locale = "en-US") => {
  return new Intl.NumberFormat(locale).format(value);
};
