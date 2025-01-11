import { Link } from "react-router-dom";
import { Movie } from "../../types/types";
import { motion } from "motion/react";

type PropsPage = {
  movie: Movie;
};

export const MovieCard = ({ movie }: PropsPage) => {
  return (
    <motion.div
      initial={{ opacity: 0, z: -10 }}
      animate={{ opacity: 1, z: 10 }}
      transition={{ duration: 0.3, ease: "easeIn" }}
      whileHover={{
        scale: 1.1,
        marginLeft: "0.7%",
        marginRight: "0.7%",
      }}
      className={`min-w-[220px]  md:min-w-[200px] h-[200px] md:h-[118px] relative  rounded-sm cursor-pointer group`}
    >
      <div
        className=" absolute inset-0 bg-cover bg-center "
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/w500${movie.backdrop_path})`,
        }}
      />

      <div className="absolute w-full border border-transparent flex flex-col gap-y-1 group-hover:border-slate-100 p-2 h-full opacity-0 group-hover:opacity-100 -top-[5px] group-hover:top-0 -z-10 bg-black/70 group-hover:z-20  transition-all duration-800 ease-in-out ">
        <p className="text-[12px] font-bold">
          {movie.title.length > 20
            ? movie.title.slice(0, 20) + "..."
            : movie.title}
        </p>
        <p className="text-[10px]">{movie.overview.slice(0, 80)}...</p>
        <Link
          className="self-end  p-1 w-6 h-6 bg-slate-300 text-slate-900 rounded-full flex items-center justify-center"
          to={`/movies/${movie.id}`}
        >
          &rarr;
        </Link>
      </div>
    </motion.div>
  );
};
