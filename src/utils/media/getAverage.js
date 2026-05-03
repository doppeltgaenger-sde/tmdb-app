export const getAverage = (items = [], key = "vote_average") => {
  if (!items.length) return 0;

  const total = items.reduce((acc, item) => {
    const value = parseFloat(item[key]) || 0;

    return acc + value;
  }, 0);

  const average = total / items.length;

  return Number(average.toFixed(1));
};
