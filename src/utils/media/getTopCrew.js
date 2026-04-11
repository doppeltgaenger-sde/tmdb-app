const IMPORTANT_JOBS = [
  "Director",
  "Screenplay",
  "Writer",
  "Novel",
];

export const getTopCrew = (crew = [], limit = 4) => {
  const grouped = crew.reduce((acc, person) => {
    if (!IMPORTANT_JOBS.includes(person.job)) return acc;

    if (!acc[person.id]) {
      acc[person.id] = {
        id: person.id,
        name: person.name,
        jobs: [],
      };
    }

    acc[person.id].jobs.push(person.job);

    return acc;
  }, {});

  return Object.values(grouped).slice(0, limit);
};
