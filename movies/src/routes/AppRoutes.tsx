import { Route, Routes } from "react-router-dom";
import { Homepage } from "../pages/Home/Homepage";
import { MoviesCountryPage } from "../pages/Movies/MoviesCountryPage";
import { Layout } from "../components/Layout/Layout";
import { MoviePage } from "../pages/Movies/MoviePage";

export const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index path="/" element={<Homepage />} />

        <Route
          path="/movies/country/:country"
          element={<MoviesCountryPage />}
        />
        <Route path="/movies/:id" element={<MoviePage />} />
      </Route>
    </Routes>
  );
};
