import { useQueries } from "@tanstack/react-query";
import {
  fetchHorrorMovies,
  fetchJapaneseMovies,
  fetchPopularMovies,
  fetchSCoreanMovies,
  fetchUpcomingMovies,
} from "../../queries/moviesQueries";
import { Movie } from "../../types/types";
import { MoviesScroll } from "../../components/MoviesScroll/MoviesScroll";
import { LoadingComponent } from "../../components/Loading/LoadingComponents";
export const Homepage = () => {
  const [
    { data: trendingMovies, isLoading: isLoadingTrending },
    { data: horrorMoviesData, isLoading: isLoadingHorror },
    { data: japaneseMoviesData, isLoading: isLoadingJapanase },
    { data: upcomingMoviesData, isLoading: isLoadingUpcoming },
    { data: scoreanMoviesData, isLoading: isLoadingCorean },
  ] = useQueries({
    queries: [
      {
        queryKey: ["popularMovies"],
        queryFn: fetchPopularMovies,
      },
      {
        queryKey: ["horrorMovies"],
        queryFn: fetchHorrorMovies,
      },
      {
        queryKey: ["japaneseMovies"],
        queryFn: fetchJapaneseMovies,
      },
      {
        queryKey: ["upcomingMovies"],
        queryFn: fetchUpcomingMovies,
      },
      {
        queryKey: ["koreanMovies"],
        queryFn: fetchSCoreanMovies,
      },
    ],
  });

  if (
    isLoadingTrending ||
    isLoadingHorror ||
    isLoadingJapanase ||
    isLoadingUpcoming ||
    isLoadingCorean
  )
    return (
      <div className="w-full h-full">
        <LoadingComponent />
      </div>
    );

  const moviesPopular: Movie[] = trendingMovies?.results || [];
  const horrorMovies: Movie[] = horrorMoviesData?.results || [];
  const japaneseMovies: Movie[] = japaneseMoviesData?.results || [];
  const upcomingMovies: Movie[] = upcomingMoviesData?.results || [];
  const coreanMovies: Movie[] = scoreanMoviesData?.results || [];
  return (
    <div className="px-4 py-4">
      {upcomingMovies.length > 0 && (
        <MoviesScroll
          movies={upcomingMovies}
          title="Upcoming Movies"
          type="upcoming"
        />
      )}
      {moviesPopular.length > 0 && (
        <MoviesScroll
          movies={moviesPopular}
          title="Popular Movies"
          type="popular"
        />
      )}
      {horrorMovies.length > 0 && (
        <MoviesScroll
          movies={horrorMovies}
          title="Horror Movies"
          type="horror"
        />
      )}
      {japaneseMovies.length > 0 && (
        <MoviesScroll
          movies={japaneseMovies}
          title="Japanese Movies"
          type="japanese"
        />
      )}
      {coreanMovies.length > 0 && (
        <MoviesScroll
          movies={coreanMovies}
          title="Corean Movies"
          type="corean"
        />
      )}
    </div>
  );
};
