import { DetailMovie, MovieCredit } from "../types/types";

interface MovieDetailData {
  details: DetailMovie;
  credits: MovieCredit;
}

export const fetchDetail = async (id: string): Promise<DetailMovie> => {
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/${id}?&api_key=${
      import.meta.env.VITE_TMDB_API_KEY
    }`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch Movie");
  }

  return await response.json();
};

export const fetchMovieCredit = async (id: string): Promise<MovieCredit> => {
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/${id}/credits?&api_key=${
      import.meta.env.VITE_TMDB_API_KEY
    }`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch Movie");
  }

  return await response.json();
};

export const fetchMovieData = async (id: string): Promise<MovieDetailData> => {
  const [details, credits] = await Promise.all([
    fetchDetail(id),
    fetchMovieCredit(id),
  ]);

  return {
    details,
    credits,
  };
};
