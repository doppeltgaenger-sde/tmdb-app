const CHART_PATTERNS = [
  [30, 45, 20, 60, 40, 70, 30, 80, 50, 90],
  [90, 70, 85, 60, 75, 50, 65, 40, 55, 30],
  [40, 50, 45, 55, 50, 60, 55, 65, 60, 70],
  [10, 80, 15, 90, 20, 100, 25, 85, 30, 95],
  [50, 55, 52, 58, 54, 50, 48, 52, 50, 55],
  [20, 40, 30, 50, 40, 60, 50, 70, 60, 80],
  [80, 20, 70, 30, 60, 40, 50, 50, 40, 60],
  [10, 15, 25, 40, 60, 80, 70, 90, 95, 100],
  [100, 95, 70, 75, 50, 55, 30, 35, 10, 15],
  [45, 55, 40, 60, 35, 65, 30, 70, 25, 75],
];

const DATE_FORMATTER = new Intl.DateTimeFormat("en-US", { 
  month: "short", 
  day: "numeric",
  year: "numeric" 
});

export const createTrendData = (movieId) => {
  const id = parseInt(movieId) || 0;
  const patternIndex = id % CHART_PATTERNS.length;
  const selectedValues = CHART_PATTERNS[patternIndex];

  return selectedValues.map((value, i) => {
    const date = new Date();
    date.setDate(date.getDate() - (selectedValues.length - i - 1));

    return {
      day: DATE_FORMATTER.format(date),
      popularity: value,
      ranked: Math.floor(100 / (value + 1)) + 1 
    };
  });
};
