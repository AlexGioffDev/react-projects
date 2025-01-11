import { Movie } from "../../types/types";
import { MovieCard } from "./MovieCard";

type PropsPage = {
  movies: Movie[];
  title: string;
  type: string;
};

export const MoviesScroll = ({ movies, title, type }: PropsPage) => {
  return (
    <section className="flex flex-col gap-y-4  py-4 ">
      <h2 className="font-light text-xl uppercase tracking-tight ">{title}</h2>
      <div className="relative">
        <div className="flex gap-2 overflow-x-scroll scrollbar-hide  py-4 px-4">
          {movies.map((movie) => (
            <MovieCard key={movie.id + `-${type}`} movie={movie} />
          ))}
        </div>
      </div>
    </section>
  );
};
