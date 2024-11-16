import React from "react";
import { useStore } from "../../store/store";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, getUserData } from "../../config/firebase";
import { useNavigate } from "react-router-dom";

const Loginpage = () => {
  const { setUser, setError, error } = useStore();
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const fd = new FormData(event.target as HTMLFormElement);
    const data = Object.fromEntries(fd.entries());
    const email = String(data["email"]);
    const password = String(data["password"]);

    try {
      const userCredentials = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      const { user } = userCredentials;

      const userData = await getUserData(user);
      if (userData) {
        setUser(userData);
        return navigate("/");
      }
    } catch {
      setError("Erro!, wrong data inserted");
    }
  };

  return (
    <div>
      <div className="flex flex-col my-4 mx-auto w-[50%] border rounded-3xl border-slate-950 p-8 gap-y-4">
        <h3 className="text-center uppercase font-bold text-4xl">Login</h3>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <div className="flex justify-center flex-1 items-center gap-x-4">
            <label htmlFor="email">Email</label>
            <input type="email" name="email" id="email" />
          </div>
          <div className="flex justify-center flex-1 items-center gap-x-4">
            <label htmlFor="password">Password</label>
            <input type="password" name="password" id="password" />
          </div>
          <button type="submit">Login</button>
          {error && <p>{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default Loginpage;
