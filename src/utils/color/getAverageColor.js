export const getCircleProgressColor = (value) => {
  if (value >= 7) return "#21d07a";
  if (value >= 5) return "#d2d531";
  if (value < 5 && value > 0) return "#db2360";
  return "#d4d4d4";
};

export const getCircleBackgroundColor = (value) => {
  if (value >= 7) return "#204529";
  if (value >= 5) return "#423d0f";
  if (value < 5 && value > 0) return "#571435";
  return "#666666";
};
