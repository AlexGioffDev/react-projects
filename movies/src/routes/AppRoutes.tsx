import { Route, Routes, Navigate } from "react-router-dom";
import { useStore } from "../store/store";
import Loginpage from "../pages/LoginPage";
import { Homepage } from "../pages/Homepage";

export const AppRoutes = () => {
  const { user } = useStore();

  return (
    <Routes>
      <Route path="/" element={user ? <Homepage /> : <Navigate to="/auth" />} />
      <Route
        path="/auth"
        element={user ? <Navigate to="/" /> : <Loginpage />}
      />
    </Routes>
  );
};
