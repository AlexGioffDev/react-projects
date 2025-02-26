import { useQuery } from "@tanstack/react-query";
import { fetchMovieData } from "../../queries/movieQueries";
import { DataValue } from "../DataValue/DataValue";
import { MovieSection } from "../MovieSection/MovieSection";
import { CastCard } from "../CastCard/CastCard";
import { Link } from "react-router-dom";
import { LoadingComponent } from "../Loading/LoadingComponents";

export const MoviePageComponent = ({ id }: { id: string | undefined }) => {
  const { data, isLoading } = useQuery({
    queryKey: ["movie-detail-" + id],
    queryFn: () => fetchMovieData(id!),
  });

  if (isLoading) return <LoadingComponent />;

  if (!isLoading && !data) {
    return <p>Error</p>;
  }

  return (
    <div
      className="relative w-full h-full overflow-hidden bg-center bg-cover"
      style={{
        backgroundImage: `url(https://image.tmdb.org/t/p/original${data?.details.backdrop_path})`,
      }}
    >
      <div className="w-full max-w-[1000px] mx-auto h-[85vh] p-8 space-y-5 z-[5] bg-black/80 border border-stone-100 rounded-md  my-2 overflow-y-auto">
        <div className="flex gap-x-10 ">
          {/* Poster and info */}
          <div className="w-[450px] h-auto border border-slate-100 overflow-hidden rounded-lg">
            <img
              src={`https://image.tmdb.org/t/p/w500${data?.details.poster_path}`}
              className="object-cover"
            />
          </div>
          <div className="p-4 w-[70%]">
            <ul className="space-y-2 ">
              <DataValue title="Title">
                <p>{data?.details.title}</p>
              </DataValue>
              <hr />
              <DataValue title="Original Title">
                <p>{data?.details.original_title}</p>
              </DataValue>
              <hr />
              <DataValue title="Original Language">
                <p className="uppercase">{data?.details.original_language}</p>
              </DataValue>
              <hr />
              <DataValue title="Duration">
                <p>{data?.details.runtime} min</p>
              </DataValue>
              <hr />
              <DataValue title="Genres">
                <p className="space-x-2">
                  {data?.details.genres.slice(0, 4).map((genre) => (
                    <span key={genre.id}>{genre.name}</span>
                  ))}
                </p>
              </DataValue>
              <hr />
              <DataValue title="Vote">
                <p>
                  {Number(data?.details.vote_average.toFixed(2)) > 0.0
                    ? data!.details.vote_average.toFixed(2)
                    : "N/A"}
                </p>
              </DataValue>
              <hr />
              <DataValue title="Budget">
                <p>
                  {data?.details.budget
                    ? new Intl.NumberFormat("en-US", {
                        style: "currency",
                        currency: "USD",
                      }).format(data.details.budget)
                    : "N/A"}
                </p>
              </DataValue>
              <hr />
              <DataValue title="Revenue">
                <p>
                  {data?.details.revenue
                    ? new Intl.NumberFormat("en-US", {
                        style: "currency",
                        currency: "USD",
                      }).format(data.details.revenue)
                    : "N/A"}
                </p>
              </DataValue>
              <hr />
              <DataValue title="Release Date">
                <p>
                  {data?.details.release_date
                    ? (() => {
                        const date = new Date(data.details.release_date);
                        return isNaN(date.getTime())
                          ? "Invalid Date"
                          : new Intl.DateTimeFormat("en-US", {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            }).format(date);
                      })()
                    : "N/A"}
                </p>
              </DataValue>
              <hr />
              <DataValue title="Origin Country">
                <p>{data?.details.origin_country.slice(0, 7).join(",")}</p>
              </DataValue>

              <hr />
              <DataValue title="Production Countries">
                <p className="space-x-2 overflow-x-auto text-sm ">
                  {data?.details.production_countries
                    .slice(0, 3)
                    .map((country) => (
                      <span key={country.iso_3166_1}>{country.name}</span>
                    ))}
                </p>
              </DataValue>
              <hr />
              <DataValue title="Production Companies">
                <p className="space-x-2">
                  {data?.details.production_companies
                    .slice(0, 2)
                    .map((company) => (
                      <span key={company.id}>{company.name.slice(0, 15)}</span>
                    ))}
                </p>
              </DataValue>
            </ul>
          </div>
        </div>
        <div className="p-2 space-y-2">
          <MovieSection title="Overview">
            <p className="tracking-tight text-justify">
              {data?.details.overview}
            </p>
          </MovieSection>
          <hr />

          {data && data.credits.cast.length > 0 && (
            <MovieSection title="Cast">
              <div className="flex w-full overflow-x-auto overflow-y-auto gap-x-4 gap-y-5">
                {data?.credits.cast.map((member) => {
                  if (!member.profile_path || !member.character) {
                    return null;
                  }
                  return (
                    <CastCard
                      key={`movie-${id}-cast-${member.character}-${member.id}`}
                      people={member}
                    />
                  );
                })}
              </div>
            </MovieSection>
          )}

          {data && data.credits.crew.length > 0 && (
            <MovieSection title="Crew">
              <div className="flex w-full overflow-x-auto overflow-y-auto gap-x-4 gap-y-5">
                {data?.credits.crew.map((member) => {
                  if (!member.profile_path) {
                    return null;
                  }
                  return (
                    <CastCard
                      key={`movie-${data.credits.id}-crew-${member.job}-${member.id}`}
                      people={member}
                    />
                  );
                })}
              </div>
            </MovieSection>
          )}

          {data && data.images.backdrops.length > 0 && (
            <MovieSection title="Backdrops">
              <div className="flex w-full overflow-x-auto gap-x-4">
                {data?.images.backdrops.map((backdrop) => {
                  return (
                    <img
                      key={`movie-backdrop-${backdrop.file_path}`}
                      src={`https://image.tmdb.org/t/p/w780${backdrop.file_path}`}
                      className="w-[400px] h-[200px] object-cover border border-stone-100"
                    />
                  );
                })}
              </div>
            </MovieSection>
          )}

          {data && data.images.posters.length > 0 && (
            <MovieSection title="Posters">
              <div className="flex w-full overflow-x-auto gap-x-4">
                {data?.images.posters.map((poster) => {
                  return (
                    <img
                      key={`movie-poster-${poster.file_path}`}
                      src={`https://image.tmdb.org/t/p/w780${poster.file_path}`}
                      className=" w-[250px] h-[400px] object-cover border border-stone-100"
                    />
                  );
                })}
              </div>
            </MovieSection>
          )}

          {data && data.videos.results.length > 0 && (
            <MovieSection title="Videos">
              <div className="flex w-full overflow-x-auto gap-x-4">
                {data.videos.results.map((vid) => {
                  return (
                    <iframe
                      key={vid.id}
                      width="400"
                      height="200"
                      src={`https://www.youtube.com/embed/${vid.key}`}
                      title={vid.name}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  );
                })}
              </div>
            </MovieSection>
          )}

          {data && data.images.posters.length > 0 && (
            <MovieSection title="Recommendations">
              <div className="flex w-full overflow-x-auto gap-x-4">
                {data?.recommendations.results.map((movie) => {
                  return (
                    <Link
                      to={`/movies/${movie.id}`}
                      key={`movie-poster-${movie.poster_path}-recommendations-${movie.id}`}
                      className="min-w-[250px] min-h-[400px]"
                    >
                      <img
                        src={`https://image.tmdb.org/t/p/w780${movie.poster_path}`}
                        className="object-cover w-full h-full border border-stone-100"
                      />
                    </Link>
                  );
                })}
              </div>
            </MovieSection>
          )}
        </div>
      </div>
    </div>
  );
};
