export const buildOverlay = ({ h, s, l }) => {
  const CONTENT_OFFSET = 170;
  const FADE_DISTANCE = 340;

  const primaryMb = `linear-gradient(
    90deg,
    hsla(${h}, ${s}%, ${l}%, 1) 0%,
    hsla(${h}, ${s}%, ${l}%, 0.95) 100%
  )`;

  const primaryDt = `linear-gradient(
    90deg,
    hsla(${h}, ${s}%, ${l}%, 1) calc((50vw - ${CONTENT_OFFSET}px) - ${FADE_DISTANCE}px),
    hsla(${h}, ${s}%, ${l}%, 0.85) 50%,
    hsla(${h}, ${s}%, ${l}%, 0.85) 100%
  )`;

  return {
    primaryMb,
    primaryDt,
  };
};
