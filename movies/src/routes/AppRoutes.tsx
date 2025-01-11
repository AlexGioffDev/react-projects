import { Route, Routes, Navigate } from "react-router-dom";
import { useStore } from "../store/store";
import Registerpage from "../pages/Auth/Register/Registerpage";
import { Homepage } from "../pages/Home/Homepage";
import Loginpage from "../pages/Auth/Login/Loginpage";
import { Auth } from "../pages/Auth/Auth";
import { MoviesCountryPage } from "../pages/Movies/MoviesCountryPage";
import { Layout } from "../components/Layout/Layout";
import { MoviePage } from "../pages/Movies/MoviePage";

export const AppRoutes = () => {
  const { user } = useStore();

  return (
    <Routes>
      <Route path="/auth" element={<Auth />}>
        <Route index element={<Navigate to="register" />} />
        <Route
          path="register"
          element={user ? <Navigate to="/" /> : <Registerpage />}
        />
        <Route
          path="login"
          element={user ? <Navigate to="/" /> : <Loginpage />}
        />
      </Route>
      <Route element={<Layout />}>
        <Route
          index
          path="/"
          element={user ? <Homepage /> : <Navigate to="/auth/register" />}
        />
        <Route
          path="/movies/country/:country"
          element={!user ? <Navigate to="/" /> : <MoviesCountryPage />}
        />
        <Route
          path="/movies/:id"
          element={!user ? <Navigate to="/" /> : <MoviePage />}
        />
      </Route>
    </Routes>
  );
};
