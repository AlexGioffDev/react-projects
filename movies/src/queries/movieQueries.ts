import { DetailMovie, MovieCredit, MovieImages } from "../types/types";

interface MovieDetailData {
  details: DetailMovie;
  credits: MovieCredit;
  images: MovieImages;
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

const fetchMovieImages = async (id: string): Promise<MovieImages> => {
  const resposnse = await fetch(
    `https://api.themoviedb.org/3/movie/${id}/images?api_key=${
      import.meta.env.VITE_TMDB_API_KEY
    }`
  );

  if (!resposnse.ok) {
    throw new Error("Faildet to fetch Image");
  }

  return await resposnse.json();
};

export const fetchMovieData = async (id: string): Promise<MovieDetailData> => {
  const [details, credits, images] = await Promise.all([
    fetchDetail(id),
    fetchMovieCredit(id),
    fetchMovieImages(id),
  ]);

  return {
    details,
    credits,
    images,
  };
};
