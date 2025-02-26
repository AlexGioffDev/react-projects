import { BrowserRouter as Router } from "react-router-dom";

import { useStore } from "./store/store";

import { AppRoutes } from "./routes/AppRoutes";
const App: React.FC = () => {
  const { theme } = useStore();

  return (
    <div className={`${theme} w-screen h-screen`}>
      <div className="w-full h-full ">
        <Router>
          <AppRoutes />
        </Router>
      </div>
    </div>
  );
};

export default App;
