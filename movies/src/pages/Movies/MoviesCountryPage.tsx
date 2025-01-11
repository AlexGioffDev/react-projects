import { useInfiniteQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { fetchMoviesByCountry } from "../../queries/moviesQueries";
import { MovieCard } from "../../components/MoviesScroll/MovieCard";
import { useRef, useEffect, useCallback, useState } from "react";

export const MoviesCountryPage = () => {
  const { country } = useParams<{ country: string }>();
  const [loading, setLoading] = useState(false);

  const fetchMovies = async ({ pageParam }: { pageParam: number }) => {
    return await fetchMoviesByCountry(country!, pageParam);
  };

  const {
    data,
    status,
    error,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
  } = useInfiniteQuery({
    queryKey: ["movies-", country],
    queryFn: fetchMovies,
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      if (lastPage.page < lastPage.total_pages && lastPage.results.length > 0) {
        return lastPage.page + 1;
      }
      return null;
    },
  });

  const movies = data?.pages.flatMap((movies) => movies.results) || [];

  const observerRef = useRef<IntersectionObserver | null>(null);
  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  const handleObserver = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const [entry] = entries;
      if (entry.isIntersecting && hasNextPage && !isFetchingNextPage) {
        setLoading(true);
        setTimeout(() => {
          fetchNextPage();
          setLoading(false);
        }, 2000);
      }
    },
    [fetchNextPage, hasNextPage, isFetchingNextPage]
  );

  useEffect(() => {
    if (loadMoreRef.current) {
      observerRef.current = new IntersectionObserver(handleObserver, {
        root: null,
        rootMargin: "0px",
        threshold: 0.9,
      });
      observerRef.current.observe(loadMoreRef.current);
    }

    return () => {
      if (observerRef.current && loadMoreRef.current) {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        observerRef.current.unobserve(loadMoreRef.current);
        observerRef.current.disconnect();
      }
    };
  }, [handleObserver]);

  if (status === "pending") {
    return <p>Loading...</p>;
  }

  if (status === "error") {
    return <p>Error: {error.message}</p>;
  }

  return (
    <div className="flex flex-wrap md:gap-x-2 gap-y-8 px-14 py-4">
      {movies.map((movie) => (
        <MovieCard key={movie.id + "-" + country} movie={movie} />
      ))}
      <div
        ref={loadMoreRef}
        className={`w-full h-10 flex justify-center items-center ${
          hasNextPage ? "" : "hidden"
        }`}
      >
        {loading ? <p className="text-sm ">Loading more...</p> : null}
      </div>
    </div>
  );
};
