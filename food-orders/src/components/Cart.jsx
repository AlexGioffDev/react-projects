import { useContext } from "react";
import { Modal } from "./UI/Modal";
import CartContext from "../store/CartContext";
import { currencyFormatter } from "../util/formatting";
import { Button } from "./UI/Button";
import UserProgressContext from "../store/UserProgressContext";
import { CartItem } from "./CartItem";

export const Cart = () => {
  const cartCtx = useContext(CartContext);
  const userProgresCtx = useContext(UserProgressContext);

  const cartTotal = cartCtx.items.reduce(
    (total, item) => total + item.quantity * item.price,
    0
  );

  const handleCloseCart = () => {
    userProgresCtx.hideCart();
  };

  const handleOpenCheckout = () => {
    userProgresCtx.showCheckout();
  };

  return (
    <Modal
      className="cart"
      open={userProgresCtx.progress === "cart"}
      onClose={userProgresCtx.progress === "cart" ? handleCloseCart : null}
    >
      <h2>Your Cart</h2>
      <ul>
        {cartCtx.items.map((item) => (
          <CartItem
            key={item.id}
            name={item.name}
            quantity={item.quantity}
            price={item.price}
            onIncrease={() => cartCtx.addItem(item)}
            onDecrease={() => cartCtx.removeItem(item.id)}
          />
        ))}
      </ul>
      <p className="cart-total">{currencyFormatter.format(cartTotal)}</p>
      <p className="modal-actions">
        <Button onClick={handleCloseCart} textOnly>
          Close
        </Button>
        {cartCtx.items.length > 0 ? (
          <Button onClick={handleOpenCheckout}>Go to checkout</Button>
        ) : null}
      </p>
    </Modal>
  );
};
