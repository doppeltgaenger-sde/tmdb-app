const defaultFormatter = new Intl.DateTimeFormat("en-US", {
  month: "long",
  day: "numeric",
  year: "numeric",
});

const getProfileAge = (birthday, deathday) => {
  const birth = new Date(birthday);
  const end = deathday ? new Date(deathday) : new Date();
  let age = end.getFullYear() - birth.getFullYear();
  const monthDiff = end.getMonth() - birth.getMonth();
  
  if (monthDiff < 0 || (monthDiff === 0 && end.getDate() < birth.getDate())) {
    age--;
  }

  return age;
};

export const getProfileBirthDate = (birthday, deathday, fallback = "–") => {
  if (!birthday) return fallback;

  const parsedDate = new Date(birthday);
  if (isNaN(parsedDate)) return fallback;

  const age = !deathday ? ` (${getProfileAge(birthday, deathday)} years old)` : "";
  
  return `${defaultFormatter.format(parsedDate)}${age}`;
};

export const getProfileDeathDate = (deathday, birthday, fallback = "") => {
  if (!deathday) return fallback;

  const parsedDate = new Date(deathday);
  if (isNaN(parsedDate)) return fallback;

  const age = ` (${getProfileAge(birthday, deathday)} years old)`;
  
  return `${defaultFormatter.format(parsedDate)}${age}`;
};
