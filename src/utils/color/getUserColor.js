const COLORS = [
  "#959595",
  "#ea148c",
  "#805be7",
  "#01d277",
  "#01c6ac",
  "#01b4e4",
  "#0177d2",
  "#d27701",
  "#d29001",
  "#d40242",
];

export const getUserColor = (key = "") => {
  let hash = 0;

  for (let i = 0; i < key.length; i++) {
    hash = (hash << 5) - hash + key.charCodeAt(i);
    hash |= 0;
  }

  return COLORS[Math.abs(hash) % COLORS.length];
};
