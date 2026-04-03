import { getScore } from "./getScore";
import { getUserColor } from "@utils";

export const createLeaderboard = (users = [], limit = 10) => {
  let maxAllTime = 1;
  let maxWeek = 1;

  for (const u of users) {
    if (u.stats.editsAllTime > maxAllTime) {
      maxAllTime = u.stats.editsAllTime;
    }

    if (u.stats.editsThisWeek > maxWeek) {
      maxWeek = u.stats.editsThisWeek;
    }
  }

  const rankedUsers = users
    .map((user) => ({
      ...user,
      color: getUserColor(user.id),
      score: getScore(user),
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);

  rankedUsers.forEach((user, index) => {
    user.rank = index + 1;
  });

  return {
    users: rankedUsers,
    maxAllTime,
    maxWeek,
  };
};
