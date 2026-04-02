export const getScore = (user) => {
  const { editsAllTime, editsThisWeek } = user.stats;

  return editsThisWeek + editsAllTime * 0.001;
};
