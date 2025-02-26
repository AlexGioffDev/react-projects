import {
  DetailMovie,
  MovieCredit,
  MovieImages,
  MoviesSearch,
  MovieVideos,
} from "../types/types";

interface MovieDetailData {
  details: DetailMovie;
  credits: MovieCredit;
  images: MovieImages;
  videos: MovieVideos;
  recommendations: MoviesSearch;
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

const fetchMovieVideos = async (id: string): Promise<MovieVideos> => {
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${
      import.meta.env.VITE_TMDB_API_KEY
    }`
  );
  if (!response.ok) {
    throw new Error("Failde to fetch Videos");
  }

  return await response.json();
};

const fetchMovieRecommendations = async (id: string): Promise<MoviesSearch> => {
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/${id}/recommendations?api_key=${
      import.meta.env.VITE_TMDB_API_KEY
    }`
  );
  if (!response.ok) {
    throw new Error("Failde to fetch Videos");
  }

  return await response.json();
};

export const fetchMovieData = async (id: string): Promise<MovieDetailData> => {
  const [details, credits, images, videos, recommendations] = await Promise.all(
    [
      fetchDetail(id),
      fetchMovieCredit(id),
      fetchMovieImages(id),
      fetchMovieVideos(id),
      fetchMovieRecommendations(id),
    ]
  );

  return {
    details,
    credits,
    images,
    videos,
    recommendations,
  };
};
