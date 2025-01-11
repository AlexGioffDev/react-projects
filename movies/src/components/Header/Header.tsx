import { signOut } from "firebase/auth";
import { useStore } from "../../store/store";
import { auth } from "../../config/firebase";
import { Link } from "react-router-dom";
import { useState } from "react";
import { MenuDropDown } from "../MenuDropDown/MenuDropDown";
export const Header = () => {
  const { user, setUser, setError } = useStore();
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

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      setError(null);
    } catch {
      setError("Error on the logout");
    }
  };

  return (
    <header className="px-8 py-4 bg-slate-800 flex items-center justify-between">
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
                className="block px-4 py-2 rounded-md hover:bg-slate-200 text-slate-800 font-medium"
              >
                España
              </Link>
              <Link
                to="/movies/country/us"
                className="block px-4 py-2 rounded-md hover:bg-slate-200 text-slate-800 font-medium"
              >
                USA
              </Link>
              <Link
                to="/movies/country/fr"
                className="block px-4 py-2 rounded-md hover:bg-slate-200 text-slate-800 font-medium"
              >
                France
              </Link>
              <Link
                to="/movies/country/pt"
                className="block px-4 py-2 rounded-md hover:bg-slate-200 text-slate-800 font-medium"
              >
                Portougal
              </Link>
              <Link
                to="/movies/country/jp"
                className="block px-4 py-2 rounded-md hover:bg-slate-200 text-slate-800 font-medium"
              >
                Japan
              </Link>
              <Link
                to="/movies/country/cn"
                className="block px-4 py-2 rounded-md hover:bg-slate-200 text-slate-800 font-medium"
              >
                China
              </Link>
            </MenuDropDown>
          </div>
        </div>

        <div className="relative">
          <button
            className={`flex items-center gap-x-4 border border-slate-700 rounded-lg p-2 bg-slate-50 ${
              menusState["profile"] ? "border-b-0 rounded-b-none" : ""
            } transition-all duration-300 ease-in`}
            onClick={() => toggleMenu("profile")}
          >
            <img
              className="w-8 h-8 rounded-full object-cover border border-slate-800"
              src={user?.avatarURL}
              alt={user?.username}
            />
            <p>{user?.username}</p>
          </button>
          <div
            className={`absolute w-full p-4 rounded-b-lg border bg-slate-50 border-slate-700 border-t-0 ${
              menusState["profile"]
                ? "h-auto z-20 opacity-100 top-11"
                : "-z-10 opacity-0 h-0 -top-0"
            } transition-all ease-in duration-300`}
          >
            <div>
              <button onClick={handleLogout}>Logout</button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
