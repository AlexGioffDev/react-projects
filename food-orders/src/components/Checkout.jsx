import { useContext } from "react";
import { Modal } from "./UI/Modal";
import CartContext from "../store/CartContext";
import { currencyFormatter } from "../util/formatting";
import { Input } from "./UI/Input";
import { Button } from "./UI/Button";
import UserProgressContext from "../store/UserProgressContext";
import { useHttp } from "../hooks/useHtpp";
import { ErrorComponent } from "./ErrorComponent";

export const Checkout = () => {
  const cartContext = useContext(CartContext);
  const userProgresCtx = useContext(UserProgressContext);
  const requestConfig = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  };

  const {
    data,
    loading: isSending,
    error,
    sendRequest,
    clearData,
  } = useHttp("http://localhost:3000/orders", requestConfig);

  const cartTotal = cartContext.items.reduce(
    (total, item) => total + item.quantity * item.price,
    0
  );

  const handleClose = () => {
    userProgresCtx.hideCheckout();
  };

  const handleFinish = () => {
    userProgresCtx.hideCheckout();
    cartContext.clearCart();
    clearData();
  };

  const hanldeSubmit = (event) => {
    event.preventDefault();

    const fd = new FormData(event.target);
    const customerData = Object.fromEntries(fd.entries());

    sendRequest(
      JSON.stringify({
        order: {
          items: cartContext.items,
          customer: customerData,
        },
      })
    );
  };

  let actions = (
    <>
      <Button onClick={handleClose} type="button" textOnly>
        Close
      </Button>
      <Button>Submit Order</Button>
    </>
  );

  if (isSending) {
    actions = <span>Sending data</span>;
  }

  if (data && !error) {
    return (
      <Modal
        open={userProgresCtx.progress === "checkout"}
        onClose={handleClose}
      >
        <h2>Sucecss!</h2>
        <p>Your order was submitted successfully.</p>
        <p>
          We will get back to you with more details via email within the next
          few minutes
        </p>
        <p className="modal-actions">
          <Button onClick={handleFinish}>Okay</Button>
        </p>
      </Modal>
    );
  }

  return (
    <Modal open={userProgresCtx.progress === "checkout"} onClose={handleClose}>
      <form onSubmit={hanldeSubmit}>
        <h2>Checkout</h2>
        <p>Total Amount: {currencyFormatter.format(cartTotal)}</p>
        <Input label="Full Name" type="text" id="name" />
        <Input label="Email Address" type="email" id="email" />
        <Input label="Street" type="text" id="street" />
        <div className="control-row">
          <Input label="Postal Code" type="text" id="postal-code" />
          <Input label="City" type="text" id="city" />
        </div>

        {error && (
          <ErrorComponent title="Failed to submit order" message={error} />
        )}
        <p className="modal-actions">{actions}</p>
      </form>
    </Modal>
  );
};
