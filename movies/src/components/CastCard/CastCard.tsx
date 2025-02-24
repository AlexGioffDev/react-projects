import { Cast } from "../../types/types";

type PropsPage = {
  people: Cast;
};

export const CastCard = ({ people }: PropsPage) => {
  return (
    <div className="min-w-[300px] h-[116px] flex items-center justify-between p-2 bg-gray-100 rounded-lg ">
      <img
        src={`https://image.tmdb.org/t/p/w400${people.profile_path}`}
        className="w-[100px] h-auto max-h-[100px] object-cover rounded-full border border-black"
        alt={people.name}
      />
      <div className="text-black jusitfy-self-end">
        <h2 className="text-[12px] text-right font-bold">{people.name}</h2>
        <h2 className="text-[10px] text-right">
          {people.character || people.job}
        </h2>
      </div>
    </div>
  );
};
