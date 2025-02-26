import { Link } from "react-router-dom";
import { useState } from "react";
import { MenuDropDown } from "../MenuDropDown/MenuDropDown";
export const Header = () => {
  const [menusState, setMenusState] = useState<Record<string, boolean>>({});
  const [menuIsOpen, setMenuIsOpen] = useState(false);

  const toggleMenu = (menuId: string) => {
    setMenusState((prev) => {
      const newState = { ...prev };
      Object.keys(newState).forEach((key) => (newState[key] = false));
      newState[menuId] = !prev[menuId];
      return newState;
    });
  };

  const closeAllMenus = () => {
    setMenuIsOpen(false);
    setMenusState({});
  };

  return (
    <header className="flex items-center justify-between px-8 py-4 bg-slate-800">
      <Link className="text-4xl font-bold uppercase text-slate-50" to="/">
        Movies
      </Link>
      <div className="flex items-center gap-x-3">
        <div className="relative">
          <button
            className={`bg-slate-300 px-4 py-2 rounded-lg flex items-center justify-between w-[8rem] shadow-md hover:bg-slate-400 ${
              menuIsOpen ? "bg-slate-400" : ""
            } transition-colors duration-300`}
            onClick={() =>
              setMenuIsOpen((prev) => {
                setMenusState({});
                return !prev;
              })
            }
          >
            <p className="font-medium">See More</p>
            <span
              className={`transform transition-transform duration-300 ${
                menuIsOpen ? "rotate-180" : "rotate-0"
              }`}
            >
              &darr;
            </span>
          </button>
          <div
            className={`absolute bg-slate-100 w-[12rem] top-12 left-4 z-10 -translate-x-1/2 p-4 rounded-lg shadow-lg transition-all duration-300 ease-in-out ${
              menuIsOpen
                ? "opacity-100 scale-100"
                : "opacity-0 scale-95 pointer-events-none"
            }`}
          >
            <MenuDropDown
              title="Countries"
              menuId="countries"
              isOpen={menusState["countries"] || false}
              onToggle={toggleMenu}
              closeAllMenus={closeAllMenus}
            >
              <Link
                to="/movies/country/es"
                className="block px-4 py-2 font-medium rounded-md hover:bg-slate-200 text-slate-800"
              >
                España
              </Link>
              <Link
                to="/movies/country/us"
                className="block px-4 py-2 font-medium rounded-md hover:bg-slate-200 text-slate-800"
              >
                USA
              </Link>
              <Link
                to="/movies/country/fr"
                className="block px-4 py-2 font-medium rounded-md hover:bg-slate-200 text-slate-800"
              >
                France
              </Link>
              <Link
                to="/movies/country/it"
                className="block px-4 py-2 font-medium rounded-md hover:bg-slate-200 text-slate-800"
              >
                Italy
              </Link>
              <Link
                to="/movies/country/pt"
                className="block px-4 py-2 font-medium rounded-md hover:bg-slate-200 text-slate-800"
              >
                Portougal
              </Link>
              <Link
                to="/movies/country/jp"
                className="block px-4 py-2 font-medium rounded-md hover:bg-slate-200 text-slate-800"
              >
                Japan
              </Link>
              <Link
                to="/movies/country/cn"
                className="block px-4 py-2 font-medium rounded-md hover:bg-slate-200 text-slate-800"
              >
                China
              </Link>
              <Link
                to="/movies/country/kr"
                className="block px-4 py-2 font-medium rounded-md hover:bg-slate-200 text-slate-800"
              >
                South Korea
              </Link>
            </MenuDropDown>
          </div>
        </div>
      </div>
    </header>
  );
};
