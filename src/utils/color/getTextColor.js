export const getTextColor = (r, g, b) => {
  const brightness = (r * 299 + g * 587 + b * 114) / 1000;

  return brightness > 150 ? "#000" : "#fff";
};
