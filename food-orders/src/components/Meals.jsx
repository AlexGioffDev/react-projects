import { useHttp } from "../hooks/useHtpp";
import { ErrorComponent } from "./ErrorComponent";
import { MealItem } from "./MealItem";

const requestConfig = {};

export const Meals = () => {
  const {
    data: loadedMeals,
    error,
    loading,
  } = useHttp("http://localhost:3000/meals", requestConfig, []);

  if (loading) {
    return <p className="center">Fetching meals...</p>;
  }

  if (error) {
    return <ErrorComponent title="Failed to feach meals" message={error} />;
  }

  return (
    <ul id="meals">
      {loadedMeals.map((meal) => (
        <MealItem key={meal.id} meal={meal} />
      ))}
    </ul>
  );
};
