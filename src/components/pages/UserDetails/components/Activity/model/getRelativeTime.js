export const getRelativeTime = (date) => {
  const diffInDays = Math.floor((new Date() - new Date(date)) / (1000 * 60 * 60 * 24));

  if (diffInDays <= 0) return "today";
  if (diffInDays === 1) return "yesterday";
  if (diffInDays < 30) return `${diffInDays} days ago`;
  
  const months = Math.floor(diffInDays / 30);

  return `${months} ${months === 1 ? "month" : "months"} ago`;
};
