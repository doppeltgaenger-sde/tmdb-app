import { getScore } from "./getScore";
import { getUserColor } from "@utils";

export const createLeaderboard = (users = [], limit = 10) => {
  const maxAllTime = Math.max(
    ...users.map((u) => u.stats.editsAllTime),
    1
  );

  const maxWeek = Math.max(
    ...users.map((u) => u.stats.editsThisWeek),
    1
  );

  const rankedUsers = users
    .map((user) => ({
      ...user,
      color: getUserColor(user.id),
      score: getScore(user),
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((user, index) => ({
      ...user,
      rank: index + 1,
    }));

  return {
    users: rankedUsers,
    maxAllTime,
    maxWeek,
  };
};
