const HUES = [
  210,
  260,
  0,
  30,
];

export const getColorFromId = (id) => {
  const h = HUES[id % HUES.length];

  return { h, s: 40, l: 25 };
};
