import { Outlet } from "react-router-dom";
import bgImage from "../../assets/background.jpg";

export const Auth = () => {
  return (
    <div
      className="bg-center bg-cover  flex flex-col items-center justify-center w-full h-full bg-white relative after:w-full after:h-full after:bg-black/80 after:absolute"
      style={{
        backgroundImage: `url(${bgImage})`,
      }}
    >
      <Outlet />
    </div>
  );
};
