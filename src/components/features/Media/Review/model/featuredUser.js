export const featuredUser = (users, id) => {
  const index = id % users.length; 

  return users[index];
};