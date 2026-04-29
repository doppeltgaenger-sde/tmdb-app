const HUES = [210, 260, 0, 30];

export const getColorFromId = (id) => {
  const numericId = Number(id) || 0;
  const h = HUES[numericId % HUES.length];

  return { h, s: 40, l: 25 };
};
