import { Cart } from "./components/Cart";
import { Checkout } from "./components/Checkout";
import { Header } from "./components/Header";
import { Meals } from "./components/Meals";
import { CartContextProvide } from "./store/CartContext";
import { UserProgressContextProvider } from "./store/UserProgressContext";

function App() {
  return (
    <UserProgressContextProvider>
      <CartContextProvide>
        <Header />
        <Meals />
        <Cart />
        <Checkout />
      </CartContextProvide>
    </UserProgressContextProvider>
  );
}

export default App;
