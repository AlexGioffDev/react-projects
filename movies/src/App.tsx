import { useEffect, useState } from "react";
import { auth } from "./config/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { BrowserRouter as Router } from "react-router-dom";

import { useStore } from "./store/store";
import { AppRoutes } from "./routes/AppRoutes";
const App: React.FC = () => {
  const { setUser, theme, toogleTheme } = useStore();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, [setUser]);

  return (
    <div className={`${theme} `}>
      <div className="bg-slate-800 dark:bg-slate-300 transition-all duration-300 ease-in">
        <header>
          <h1>Hello</h1>
          <button onClick={toogleTheme}>
            Toggle Theme ({theme === "light" ? "dark" : "light"})
          </button>
        </header>
        {loading && <p>Loading...</p>}
        {!loading && (
          <Router>
            <div>
              <AppRoutes />
            </div>
          </Router>
        )}
      </div>
    </div>
  );
};

export default App;
