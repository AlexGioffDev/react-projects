import { useParams } from "react-router-dom";
import { MoviePageComponent } from "../../components/MoviePageComponent/MoviePageComponent";

export const MoviePage = () => {
  const { id } = useParams<{ id: string }>();

  return <MoviePageComponent key={id} id={id} />;
};
