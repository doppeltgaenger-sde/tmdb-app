const clamp = (v, min, max) => Math.min(Math.max(v, min), max);

export const normalizeColor = ({ r, g, b }) => {
  const DARKEN = 0.65;

  r *= DARKEN;
  g *= DARKEN;
  b *= DARKEN;

  const avg = (r + g + b) / 3;
  const DESAT = 0.85;

  r = r * DESAT + avg * (1 - DESAT);
  g = g * DESAT + avg * (1 - DESAT);
  b = b * DESAT + avg * (1 - DESAT);

  r = clamp(r, 20, 220);
  g = clamp(g, 20, 220);
  b = clamp(b, 20, 220);

  return {
    r: Math.round(r),
    g: Math.round(g),
    b: Math.round(b),
  };
};
