import React, { useState } from "react";
import { useStore } from "../store/store";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../config/firebase";

const Loginpage = () => {
  const { setUser, setError } = useStore();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isLogin, setIsLogin] = useState<boolean>(true); // Gestisce il cambio tra login e registrazione

  const handleFormSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      if (isLogin) {
        const userCredential = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );
        setUser(userCredential.user);
        setError(null);
      } else {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        setUser(userCredential.user);
        setError(null);
      }
    } catch {
      setError(
        isLogin
          ? "Errore durante il login. Verifica le credenziali."
          : "Errore durante la registrazione."
      );
    }
  };

  return (
    <div>
      <h2>{isLogin ? "Login" : "Registrati"}</h2>
      <form onSubmit={handleFormSubmit}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">{isLogin ? "Login" : "Registrati"}</button>
      </form>
      <button onClick={() => setIsLogin(!isLogin)}>
        {isLogin ? "Non hai un account?" : "Hai già un account?"}
      </button>
    </div>
  );
};

export default Loginpage;
