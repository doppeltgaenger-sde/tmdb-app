import { getRelativeTime } from "./getRelativeTime";

export const createUserActivity = (activities) => {
  return activities.map((item) => ({
    ...item,
    date: getRelativeTime(new Date(Date.now() - Math.floor(Math.random() * 60) * 86400000))
  }));
};
