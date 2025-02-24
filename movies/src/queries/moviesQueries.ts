import { countryLanguageMap, MoviesSearch } from "../types/types";

const fetchPageTrending = async (page: number): Promise<MoviesSearch> => {
  const response = await fetch(
    `https://api.themoviedb.org/3/trending/movie/day?&api_key=${
      import.meta.env.VITE_TMDB_API_KEY
    }&page=${page}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch popular Movies");
  }

  const data: MoviesSearch = await response.json();
  return data;
};

const fetchPageUpcoming = async (page: number): Promise<MoviesSearch> => {
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/upcoming?&api_key=${
      import.meta.env.VITE_TMDB_API_KEY
    }&page=${page}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch popular Movies");
  }

  const data: MoviesSearch = await response.json();
  return data;
};

const fetchPagePopular = async (page: number): Promise<MoviesSearch> => {
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/popular?&api_key=${
      import.meta.env.VITE_TMDB_API_KEY
    }&page=${page}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch popular Movies");
  }

  const data: MoviesSearch = await response.json();
  return data;
};

const fetchPageDiscoverByCountry = async (
  page: number,
  country: string
): Promise<MoviesSearch> => {
  const language = countryLanguageMap[country.toUpperCase()] || "en";

  const response = await fetch(
    `https://api.themoviedb.org/3/discover/movie?&api_key=${
      import.meta.env.VITE_TMDB_API_KEY
    }&page=${page}&with_origin_country=${country.toUpperCase()}&with_original_language=${language}`
  );
  if (!response.ok) {
    throw new Error("Failed to fetch popular Movies");
  }

  const data: MoviesSearch = await response.json();
  return data;
};

const fetchPageTopRated = async (page: number): Promise<MoviesSearch> => {
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/top_rated?&api_key=${
      import.meta.env.VITE_TMDB_API_KEY
    }&page=${page}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch popular Movies");
  }

  const data: MoviesSearch = await response.json();
  return data;
};

const addUniqueMovies = (
  newMovies: MoviesSearch["results"],
  existingMovies: MoviesSearch["results"]
): MoviesSearch["results"] => {
  const existingIds = new Set(existingMovies.map((movie) => movie.id));
  return [
    ...existingMovies,
    ...newMovies.filter((movie) => !existingIds.has(movie.id)),
  ];
};

export const fetchPopularMovies = async (): Promise<MoviesSearch> => {
  let page = 1;
  let allMovies: MoviesSearch["results"] = [];
  let totalPages = 1;

  while (allMovies.length < 15 && page <= totalPages) {
    const data = await fetchPagePopular(page);

    totalPages = data.total_pages;

    const validMovies = data.results.filter(
      (movie) =>
        movie.poster_path &&
        movie.poster_path !== "" &&
        movie.backdrop_path &&
        movie.backdrop_path !== ""
    );

    allMovies = allMovies = addUniqueMovies(validMovies, allMovies);
    if (allMovies.length >= 15) {
      break;
    }

    page++;
  }

  allMovies = allMovies.slice(0, 15);

  return {
    results: allMovies,
    page: 1,
    total_pages: totalPages,
    total_results: allMovies.length,
  };
};

export const fetchHorrorMovies = async (): Promise<MoviesSearch> => {
  let page = 1;
  let allMovies: MoviesSearch["results"] = [];
  let totalPages = 1;

  while (allMovies.length < 15 && page <= totalPages) {
    const data = await fetchPageTrending(page);
    totalPages = data.total_pages;
    const validMovies = data.results.filter(
      (movie) =>
        movie.poster_path &&
        movie.poster_path !== "" &&
        movie.backdrop_path &&
        movie.backdrop_path !== "" &&
        movie.genre_ids.includes(27)
    );
    console.log(data);

    allMovies = addUniqueMovies(validMovies, allMovies);

    if (allMovies.length >= 15) {
      break;
    }

    page++;
  }

  allMovies = allMovies.slice(0, 15);
  return {
    results: allMovies,
    page: 1,
    total_pages: totalPages,
    total_results: allMovies.length,
  };
};

export const fetchJapaneseMovies = async (): Promise<MoviesSearch> => {
  let page = 1;
  let allMovies: MoviesSearch["results"] = [];
  let totalPages = 1;

  while (allMovies.length < 15 && page <= totalPages) {
    const data = await fetchPageTopRated(page);
    totalPages = data.total_pages;
    const validMovies = data.results.filter(
      (movie) =>
        movie.poster_path &&
        movie.poster_path !== "" &&
        movie.backdrop_path &&
        movie.backdrop_path !== "" &&
        movie.original_language == "ja"
    );

    allMovies = addUniqueMovies(validMovies, allMovies);

    if (allMovies.length >= 15) {
      break;
    }

    page++;
  }

  allMovies = allMovies.slice(0, 15);

  return {
    results: allMovies,
    page: 1,
    total_pages: totalPages,
    total_results: allMovies.length,
  };
};

export const fetchUpcomingMovies = async (): Promise<MoviesSearch> => {
  let page = 1;
  let allMovies: MoviesSearch["results"] = [];
  let totalPages = 1;

  while (allMovies.length < 15 && page <= totalPages) {
    const data = await fetchPageUpcoming(page);
    totalPages = data.total_pages;

    const validMovies = data.results.filter(
      (movie) =>
        movie.poster_path &&
        movie.poster_path !== "" &&
        movie.backdrop_path &&
        movie.backdrop_path !== ""
    );

    allMovies = addUniqueMovies(validMovies, allMovies);

    if (allMovies.length >= 15) {
      break;
    }

    page++;
  }
  allMovies = allMovies.slice(0, 15);

  return {
    results: allMovies,
    page: 1,
    total_pages: totalPages,
    total_results: allMovies.length,
  };
};

export const fetchSCoreanMovies = async (): Promise<MoviesSearch> => {
  let page = 1;
  let allMovies: MoviesSearch["results"] = [];
  let totalPages = 1;
  while (allMovies.length < 15 && page <= totalPages) {
    const data = await fetchPageTopRated(page);
    totalPages = data.total_pages;
    const validMovies = data.results.filter(
      (movie) =>
        movie.poster_path &&
        movie.poster_path !== "" &&
        movie.backdrop_path &&
        movie.backdrop_path !== "" &&
        movie.original_language == "ko"
    );
    allMovies = addUniqueMovies(validMovies, allMovies);
    if (allMovies.length >= 15) {
      break;
    }
    page++;
  }
  allMovies = allMovies.slice(0, 15);
  return {
    results: allMovies,
    page: 1,
    total_pages: totalPages,
    total_results: allMovies.length,
  };
};

export const fetchMoviesByCountry = async (
  country: string,
  page: number
): Promise<MoviesSearch> => {
  let allMovies: MoviesSearch["results"] = [];
  let totalPages = 1;
  const data = await fetchPageDiscoverByCountry(page, country);
  totalPages = data.total_pages;
  const validMovies = data.results.filter(
    (movie) =>
      movie.poster_path &&
      movie.poster_path !== "" &&
      movie.backdrop_path &&
      movie.backdrop_path !== ""
  );

  allMovies = addUniqueMovies(validMovies, allMovies);

  return {
    results: allMovies,
    page: page,
    total_pages: totalPages,
    total_results: allMovies.length,
  };
};
