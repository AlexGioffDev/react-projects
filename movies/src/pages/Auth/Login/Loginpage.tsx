import React from "react";
import { useStore } from "../../../store/store";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, getUserData } from "../../../config/firebase";
import { Link, useNavigate } from "react-router-dom";
import { FormContainer } from "../../../components/Form/FormContainer/FormContainer";
import { ButtonFormContainer } from "../../../components/Form/ButtonFormContainer/ButtonFormContainer";

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
    <FormContainer>
      <h3 className="text-4xl font-bold text-center uppercase text-slate-300">
        Login
      </h3>
      <form
        className="flex flex-col items-center justify-center gap-y-8"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-col items-center flex-1 gap-y-2 md:gap-y-0 md:flex-row gap-x-12">
          <label
            className="text-sm font-semibold uppercase text-slate-50 md:w-20"
            htmlFor="email"
          >
            Email
          </label>
          <input
            className="px-2 py-1 text-lg rounded-lg border-slate-600 text-slate-950 bg-slate-100"
            type="email"
            name="email"
            id="email"
          />
        </div>
        <div className="flex flex-col items-center flex-1 gap-y-2 md:gap-y-0 md:flex-row gap-x-12">
          <label
            className="text-sm font-semibold uppercase text-slate-50 md:w-20"
            htmlFor="password"
          >
            Password
          </label>
          <input
            className="px-2 py-1 text-lg rounded-lg border-slate-600 text-slate-950 bg-slate-100"
            type="password"
            name="password"
            id="password"
          />
        </div>
        <ButtonFormContainer type="submit">Login</ButtonFormContainer>
        <p>
          New here? Create an account!
          <Link
            to="/auth/register"
            className="px-2 font-semibold text-blue-500"
          >
            Sign Up
          </Link>
        </p>
        {error && <p>{error}</p>}
      </form>
    </FormContainer>
  );
};

export default Loginpage;
