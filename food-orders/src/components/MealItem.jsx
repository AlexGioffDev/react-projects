import PropTypes from "prop-types";
import { currencyFormatter } from "../util/formatting";
import { Button } from "./UI/Button";
import { useContext } from "react";
import CartContext from "../store/CartContext";

export const MealItem = ({ meal }) => {
  const context = useContext(CartContext);

  const handleAddItem = () => {
    context.addItem(meal);
  };

  return (
    <li className="meal-item">
      <article>
        <img src={`http://localhost:3000/${meal.image}`} alt={meal.name} />
        <div>
          <h3>{meal.name}</h3>
          <p className="meal-item-price">
            {currencyFormatter.format(meal.price)}
          </p>
          <p className="meal-item-description">{meal.description}</p>
        </div>
        <p className="meal-item-actions">
          <Button onClick={handleAddItem}>Add to Cart</Button>
        </p>
      </article>
    </li>
  );
};

MealItem.propTypes = {
  meal: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    price: PropTypes.string,
    description: PropTypes.string,
    image: PropTypes.string,
  }).isRequired,
};
