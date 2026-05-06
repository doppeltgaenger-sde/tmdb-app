const MOVIE_JOBS = [
  "Director", 
  "Screenplay", 
  "Writer", 
  "Novel", 
  "Characters", 
  "Story"
];

const TV_JOBS = [
  "Producer",
  "Writing", 
  "Directing", 
  "Sound",
  "Production"
];

export const getMediaTopCrew = (data, mediaType, limit = 4) => {
  const crew = data?.credits?.crew || [];
  const createdBy = data?.created_by || [];
  
  const currentJobs = mediaType === "tv" ? TV_JOBS : MOVIE_JOBS;

  const grouped = crew.reduce((acc, person) => {
    if (!currentJobs.includes(person.job)) return acc;

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

  let result = Object.values(grouped);

  if (mediaType === "tv" && createdBy.length > 0) {
    const creators = createdBy.map(c => ({
      id: c.id,
      name: c.name,
      jobs: ["Creator"]
    }));
    result = [...creators, ...result.filter(r => !creators.some(c => c.id === r.id))];
  }

  return result
    .sort((a, b) => {
      const aIdx = currentJobs.indexOf(a.jobs[0]);
      const bIdx = currentJobs.indexOf(b.jobs[0]);
      return (a.jobs[0] === "Creator" ? -1 : aIdx) - (b.jobs[0] === "Creator" ? -1 : bIdx);
    })
    .slice(0, limit);
};
