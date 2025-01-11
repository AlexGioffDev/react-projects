import React from "react";
import { useStore } from "../../../store/store";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, getUserData } from "../../../config/firebase";
import { useNavigate } from "react-router-dom";
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
      <h3 className="text-center uppercase font-bold text-4xl text-slate-300">
        Login
      </h3>
      <form
        className="flex justify-center flex-col gap-y-8 items-center"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-col gap-y-2 md:gap-y-0  md:flex-row gap-x-12 flex-1 items-center">
          <label
            className="text-slate-50 font-semibold uppercase text-sm md:w-20"
            htmlFor="email"
          >
            Email
          </label>
          <input
            className="border-slate-600 py-1 px-2 text-lg text-slate-950 bg-slate-100 rounded-lg"
            type="email"
            name="email"
            id="email"
          />
        </div>
        <div className="flex flex-col gap-y-2 md:gap-y-0  md:flex-row gap-x-12 flex-1 items-center">
          <label
            className="text-slate-50 font-semibold uppercase text-sm md:w-20"
            htmlFor="password"
          >
            Password
          </label>
          <input
            className="border-slate-600 py-1 px-2 text-lg text-slate-950 bg-slate-100 rounded-lg"
            type="password"
            name="password"
            id="password"
          />
        </div>
        <ButtonFormContainer type="submit">Login</ButtonFormContainer>
        {error && <p>{error}</p>}
      </form>
    </FormContainer>
  );
};

export default Loginpage;
