import { Route, Routes, Navigate } from "react-router-dom";
import { useStore } from "../store/store";
// import Loginpage from "../pages/Login/Loginpage";
import Registerpage from "../pages/Register/Registerpage";
import { Homepage } from "../pages/Home/Homepage";
import Loginpage from "../pages/Login/Loginpage";

export const AppRoutes = () => {
  const { user } = useStore();

  return (
    <Routes>
      <Route
        path="/"
        element={user ? <Homepage /> : <Navigate to="/register" />}
      />
      <Route
        path="/register"
        element={user ? <Navigate to="/" /> : <Registerpage />}
      />
      <Route
        path="/login"
        element={user ? <Navigate to="/" /> : <Loginpage />}
      />
    </Routes>
  );
};
