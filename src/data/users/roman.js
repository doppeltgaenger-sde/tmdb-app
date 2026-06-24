import avatarRoman from "./assets/avatar-roman.webp";

export const roman = {
  id: "roman",
  username: "Roman",
  createdAt: "November 2022",
  avatar: avatarRoman,
  scores: {
    scoreMovie: 9.1,
    scoreTV: 9.0,
  },
  stats: { 
    editsAllTime: 778035, 
    editsThisWeek: 27220,
    ratingsTotal: 3556,
  },
  ratingDistribution: [
    {
      rating: 1,
      count: 0,
    },
    {
      rating: 2,
      count: 0,
    },
    {
      rating: 3,
      count: 2,
    },
    {
      rating: 4,
      count: 3,
    },
    {
      rating: 5,
      count: 6,
    },
    {
      rating: 6,
      count: 10,
    },
    {
      rating: 7,
      count: 6,
    },
    {
      rating: 8,
      count: 22,
    },
    {
      rating: 9,
      count: 59,
    },
    {
      rating: 10,
      count: 129,
    },
  ],
  genreDistribution: [
    {
      genre: "Comedy",
      percentage: 22.42,
    },
    {
      genre: "Drama",
      percentage: 17.04,
    },
    {
      genre: "Mystery",
      percentage: 9.87,
    },
    {
      genre: "Crime",
      percentage: 8.97,
    },
    {
      genre: "Other",
      percentage: 41.70,
    },
  ],
  review: {
    score: 85,
    date: "March 22, 2026",
    title: "Atmospheric slow-burn with incredible tension",
    content: "The tension in this film is almost unbearable at times. The director uses silence as a weapon, building dread in the quietest moments rather than relying on a bombastic score. The acting is top-tier across the board, bringing a lot of nuance to roles that could have easily been caricatures. It’s a brave and necessary film that refuses to take the easy way out, opting instead for a thematic resolution that lingers in the mind.\n\nI felt the ending was a bit rushed compared to the slow-burn build-up of the first two acts, which is a shame given the meticulous setup. Nevertheless, the sheer audacity of the filmmaking makes it a very impressive work that stands out from typical Hollywood fare. The chemistry between the leads is palpable, making the central relationship the heartbeat of the entire film even in its darkest moments.",
  }
};
