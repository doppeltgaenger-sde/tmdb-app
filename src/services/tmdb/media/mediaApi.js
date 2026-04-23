import { shuffleArray, attachMediaType } from "@utils";
import { apiClient } from "../instance";

const CATEGORY = {
  FREE: "freeTrack",
  POPULAR: "popularTrack",
  TRENDING: "trendingTrack",
  TRAILERS: "trailersTrack",
};

const FREE_ENDPOINT_MAP = {
  movie: `/discover/movie`,
  tv: `/discover/tv`,
};

const POPULAR_ENDPOINT_MAP = {
  streaming: { url: `/trending/movie/week`, media_type: "movie" },
  tv: { url: `/tv/on_the_air`, media_type: "tv" },
  rent: { url: `/discover/movie`, media_type: "movie" },
  theaters: { url: `/movie/now_playing`, media_type: "movie" },
};

const TRENDING_ENDPOINT_MAP = {
  today: `/trending/all/day`,
  week: `/trending/all/week`,
};

const TRAILERS_ENDPOINT_MAP = {
  streaming: { url: `/trending/movie/week`, media_type: "movie" },
  tv: { url: `/tv/on_the_air`, media_type: "tv" },
  rent: { url: `/discover/movie`, media_type: "movie" },
  theaters: { url: `/movie/now_playing`, media_type: "movie" },
};

const FREE_PARAMS = {
  watch_region: "US",
  with_watch_monetization_types: "free",
  sort_by: "popularity.desc",
};

const RENT_PARAMS = {
  watch_region: "US",
  with_watch_monetization_types: "rent",
  sort_by: "popularity.desc",
};

export const fetchMediaApi = async ({ type, category, page = 1 }) => {
  let endpoint = "";
  const params = { page };

  if (category === CATEGORY.FREE) {
    endpoint = FREE_ENDPOINT_MAP[type];

    Object.assign(params, FREE_PARAMS);

    return apiClient.get(endpoint, { params });
  }

  if (category === CATEGORY.POPULAR) {
    const config = POPULAR_ENDPOINT_MAP[type];
    endpoint = config.url;

    if (type === "rent") {
      Object.assign(params, RENT_PARAMS);
    }

    const response = await apiClient.get(endpoint, { params });

    return {
      data: {
        results: attachMediaType(response.data.results, config.media_type),
      },
    };
  }

  if (category === CATEGORY.TRENDING) {
    endpoint = TRENDING_ENDPOINT_MAP[type];

    return apiClient.get(endpoint, { params });
  }

  if (category === CATEGORY.TRAILERS) {
    if (type === "popular") {
      const [moviesRes, tvRes] = await Promise.all([
        apiClient.get(`/movie/popular`, { params }),
        apiClient.get(`/tv/popular`, { params }),
      ]);

      const movies = attachMediaType(moviesRes.data.results, "movie");
      const tv = attachMediaType(tvRes.data.results, "tv");

      const combined = [...movies, ...tv];
      const shuffled = shuffleArray(combined);
      const sliced = shuffled.slice(0, 20);

      return {
        data: {
          results: sliced,
        },
      };
    }

    const config = TRAILERS_ENDPOINT_MAP[type];
    endpoint = config.url;

    if (type === "rent") {
      Object.assign(params, RENT_PARAMS);
    }

    const response = await apiClient.get(endpoint, { params });

    return {
      data: {
        results: attachMediaType(response.data.results, config.media_type),
      },
    };
  }
};

export const fetchReleaseDates = async (id, mediaType = "movie") => {
  const endpoint =
    mediaType === "tv"
      ? `/${mediaType}/${id}/content_ratings`
      : `/${mediaType}/${id}/release_dates`;

  const response = await apiClient.get(endpoint);

  return response.data.results || [];
};

export const fetchMediaDetailsApi = async ({ mediaType, id }) => {
  const endpoint = `/${mediaType}/${id}`;
  const params = { append_to_response: "videos,credits,recommendations,keywords,external_ids" };

  try {
    const { data: details } = await apiClient.get(endpoint, { params });
    const posterUrl = `https://image.tmdb.org/t/p/w45${details.poster_path}`;

    const [releaseDates, contextColor] = await Promise.all([
      fetchReleaseDates(id, mediaType),
      fetch(`/api/color?url=${encodeURIComponent(posterUrl)}`)
        .then(res => res.ok ? res.json() : null)
        .catch(() => null)
    ]);

    console.log(details);

    return {
      details,
      releaseDates: releaseDates,
      contextColor: contextColor || { r: 20, g: 20, b: 20 },
    };
  } catch (e) {
    console.error("fetchMediaFullDetailsApi Error:", e);
    throw e;
  }
};
