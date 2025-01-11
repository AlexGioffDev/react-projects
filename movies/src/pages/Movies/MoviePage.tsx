import { useParams } from "react-router-dom";
import { fetchMovieData } from "../../queries/movieQueries";
import { useQuery } from "@tanstack/react-query";

export const MoviePage = () => {
  const { id } = useParams<{ id: string }>();

  const { data } = useQuery({
    queryKey: ["movie-detail-" + id],
    queryFn: () => fetchMovieData(id!),
  });

  return (
    <div
      className="w-full h-full bg-cover bg-center relative overflow-hidden"
      style={{
        backgroundImage: `url(https://image.tmdb.org/t/p/original${data?.details.backdrop_path})`,
      }}
    >
      <div className="w-full max-w-[1000px] mx-auto h-[85vh] p-8 space-y-5 z-[5] bg-black/80  my-2 overflow-y-auto">
        <div className="flex gap-x-10  ">
          {/* Poster and info */}
          <div className="w-[450px] h-auto border border-slate-100 overflow-hidden rounded-lg">
            <img
              src={`https://image.tmdb.org/t/p/w500${data?.details.poster_path}`}
              className="object-cover"
            />
          </div>
          <div className="p-4 w-[70%]">
            <ul className="space-y-2 ">
              <li className="flex items-center justify-between">
                <p>Title:</p>
                <p>{data?.details.title}</p>
              </li>
              <hr />
              <li className="flex items-center justify-between">
                <p>Original Title:</p>
                <p>{data?.details.original_title}</p>
              </li>
              <hr />
              <li className="flex items-center justify-between">
                <p>Original Language:</p>
                <p>{data?.details.original_language}</p>
              </li>
              <hr />
              <li className="flex items-center justify-between">
                <p>Duration:</p>
                <p>{data?.details.runtime} min</p>
              </li>
              <hr />
              <li className="flex items-center justify-between">
                <p>Genres:</p>
                <p className="space-x-2">
                  {data?.details.genres.slice(0, 4).map((genre) => (
                    <span key={genre.id}>{genre.name}</span>
                  ))}
                </p>
              </li>
              <hr />
              <li className="flex items-center justify-between">
                <p>Vote:</p>
                <p>{data?.details.vote_average.toFixed(2)}</p>
              </li>
              <hr />
              <li className="flex items-center justify-between">
                <p>Budget:</p>
                <p>
                  {data?.details.budget
                    ? new Intl.NumberFormat("en-US", {
                        style: "currency",
                        currency: "USD",
                      }).format(data.details.budget)
                    : "N/A"}
                </p>
              </li>
              <hr />
              <li className="flex items-center justify-between">
                <p>Revenue:</p>
                <p>
                  {data?.details.revenue
                    ? new Intl.NumberFormat("en-US", {
                        style: "currency",
                        currency: "USD",
                      }).format(data.details.revenue)
                    : "N/A"}
                </p>
              </li>
              <hr />
              <li className="flex items-center justify-between">
                <p>Release Date:</p>
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
              </li>
              <hr />
              <li className="flex items-center justify-between">
                <p>Origin Country:</p>
                <p>{data?.details.origin_country.join(",")}</p>
              </li>
              <hr />
              <li className="flex items-center justify-between">
                <p>Production Countries:</p>
                <p className="space-x-2">
                  {data?.details.production_countries
                    .slice(0, 3)
                    .map((country) => (
                      <span key={country.iso_3166_1}>{country.name}</span>
                    ))}
                </p>
              </li>
              <hr />
              <li className="flex items-center justify-between">
                <p>Production Companies:</p>
                <p className="space-x-2">
                  {data?.details.production_companies
                    .slice(0, 2)
                    .map((company) => (
                      <span key={company.id}>{company.name.slice(0, 15)}</span>
                    ))}
                </p>
              </li>
            </ul>
          </div>
        </div>
        <div className="flex flex-col gap-y-2 p-2 ">
          <h3 className=" border-b border-b-slate-100">Overview:</h3>
          <p className="tracking-tight text-justify">
            {data?.details.overview}
          </p>

          <h3 className="font-bold uppercase text-xl">Cast</h3>
          <div className="flex justify-between px-10 items-center h-[300px] overflow-y-auto flex-wrap gap-y-5 mx-auto w-[90%]">
            {data?.credits.cast.map((member) => {
              if (!member.profile_path) {
                return null;
              } // Salta membri senza immagine
              return (
                <div
                  key={`movie-${data.credits.id}-cast-${member.id}`}
                  className="basis-[40%] flex items-center  rounded-lg justify-between bg-gray-100 p-2"
                >
                  <img
                    src={`https://image.tmdb.org/t/p/w400${member.profile_path}`}
                    className="w-[100px] h-auto max-h-[100px] object-cover rounded-full border border-black"
                    alt={member.name}
                  />
                  <div className="jusitfy-self-end text-black">
                    <h2 className="text-[12px] text-right font-bold">
                      {member.name}
                    </h2>
                    <h2 className="text-[10px] text-right">
                      {member.character}
                    </h2>
                  </div>
                </div>
              );
            })}
          </div>

          <h3 className="font-bold uppercase text-xl">Crew</h3>
          <div className="flex justify-between px-10 items-center h-[300px] overflow-y-auto flex-wrap gap-y-5 mx-auto w-[90%]">
            {data?.credits.crew.map((member) => {
              if (!member.profile_path) {
                return null;
              } // Salta membri senza immagine
              return (
                <div
                  key={`movie-${data.credits.id}-cast-${member.job}-${member.id}`}
                  className="basis-[40%] flex items-center  rounded-lg justify-between bg-gray-100 p-2"
                >
                  <img
                    src={`https://image.tmdb.org/t/p/w400${member.profile_path}`}
                    className="w-[100px] h-auto max-h-[100px] object-cover rounded-full border border-black"
                    alt={member.name}
                  />
                  <div className="jusitfy-self-end text-black">
                    <h2 className="text-[12px] text-right font-bold">
                      {member.name}
                    </h2>
                    <h2 className="text-[10px] text-right">{member.job}</h2>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
