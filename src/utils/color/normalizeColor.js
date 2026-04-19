const clamp = (v, min, max) => Math.min(Math.max(v, min), max);

export const normalizeColor = ({ r, g, b }) => {
  const MIN_DARKNESS = 20; 

  return {
    r: Math.round(clamp(r, MIN_DARKNESS, 255)),
    g: Math.round(clamp(g, MIN_DARKNESS, 255)),
    b: Math.round(clamp(b, MIN_DARKNESS, 255)),
  };
};
