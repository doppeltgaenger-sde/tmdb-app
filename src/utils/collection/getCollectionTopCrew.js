const COLLECTION_JOBS = [
  "Director", 
  "Screenplay", 
  "Writer", 
  "Novel", 
  "Characters", 
  "Story"
];

export const getCollectionTopCrew = (crew, limit = 20) => {
  if (!crew || !Array.isArray(crew)) return [];

  const grouped = crew.reduce((acc, person) => {
    if (!COLLECTION_JOBS.includes(person.job)) return acc;

    if (!acc[person.id]) {
      acc[person.id] = {
        id: person.id,
        name: person.name,
        profilePath: person.profile_path,
        jobs: new Set(),
      };
    }
    
    acc[person.id].jobs.add(person.job);
    return acc;
  }, {});

  return Object.values(grouped)
    .map(person => ({
      ...person,
      jobs: Array.from(person.jobs)
    }))
    .sort((a, b) => {
      const aMinIdx = Math.min(...a.jobs.map(job => COLLECTION_JOBS.indexOf(job)));
      const bMinIdx = Math.min(...b.jobs.map(job => COLLECTION_JOBS.indexOf(job)));
      
      return aMinIdx - bMinIdx;
    })
    .slice(0, limit);
};
