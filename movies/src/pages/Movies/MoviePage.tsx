import { useParams } from "react-router-dom";
import { fetchMovieData } from "../../queries/movieQueries";
import { useQuery } from "@tanstack/react-query";
import { MovieSection } from "../../components/MovieSection/MovieSection";
import { CastCard } from "../../components/CastCard/CastCard";
import { DataValue } from "../../components/DataValue/DataValue";

export const MoviePage = () => {
  const { id } = useParams<{ id: string }>();

  const { data } = useQuery({
    queryKey: ["movie-detail-" + id],
    queryFn: () => fetchMovieData(id!),
  });

  console.log(data);

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
                <p>{data?.details.vote_average.toFixed(2)}</p>
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
                      src={`https://image.tmdb.org/t/p/original${backdrop.file_path}`}
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
                      src={`https://image.tmdb.org/t/p/original${poster.file_path}`}
                      className=" w-[250px] h-[400px] object-cover border border-stone-100"
                    />
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
