export const buildOverlay = ({ h, s, l }) => {
  return `linear-gradient(
    90deg,
    hsla(${h}, ${s}%, ${l}%, 0.85) 0%,
    hsla(${h}, ${s}%, ${l}%, 0.7) 50%,
    hsla(${h}, ${s}%, ${l}%, 0.7) 100%
  )`;
};
