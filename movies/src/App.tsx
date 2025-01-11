import { useEffect, useState } from "react";
import { auth, getUserData } from "./config/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { BrowserRouter as Router } from "react-router-dom";

import { useStore } from "./store/store";

import { AppRoutes } from "./routes/AppRoutes";
const App: React.FC = () => {
  const { setUser, theme } = useStore();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userData = await getUserData(user);
        if (userData) {
          setUser(userData);
        }
      } else {
        setUser(null);
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, [setUser]);

  return (
    <div className={`${theme} w-screen h-screen`}>
      <div className=" w-full h-full">
        {loading && <p>make loading page</p>}
        {!loading && (
          <Router>
            <AppRoutes />
          </Router>
        )}
      </div>
    </div>
  );
};

export default App;
