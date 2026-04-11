export const formatGenresList = (genres = []) => {
  if (!genres.length) return [];

  return genres.map((genre, index) => {
    const isLast = index === genres.length - 1;
    const isSecondLast = index === genres.length - 2;

    return {
      name: genre,
      separator:
        genres.length === 1
          ? ""
          : genres.length === 2
          ? index === 0
            ? " and "
            : ""
          : isLast
          ? ""
          : isSecondLast
          ? " and "
          : ", ",
    };
  });
};