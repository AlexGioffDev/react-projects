import { Outlet } from "react-router-dom";
import { Header } from "../Header/Header";

export const Layout = () => {
  return (
    <div className="h-screen flex flex-col overflow-x-hidden">
      <Header />
      <main className="flex-grow text-slate-100 bg-slate-950 overflow-auto  space-y-4 ">
        <Outlet />
      </main>
    </div>
  );
};
