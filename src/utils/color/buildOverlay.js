export const buildOverlay = ({ h, s, l }) => {
  const primaryMb = `linear-gradient(
    90deg,
    hsla(${h}, ${s}%, ${l}%, 1) 0%,
    hsla(${h}, ${s}%, ${l}%, 0.95) 100%
  )`;

  const primaryDt = `linear-gradient(
    90deg,
    hsla(${h}, ${s}%, ${l}%, 1) calc((50vw - 170px) - 340px),
    hsla(${h}, ${s}%, ${l}%, 0.85) 50%,
    hsla(${h}, ${s}%, ${l}%, 0.85) 100%
  )`;

  return {
    primaryMb,
    primaryDt,
  };
};
