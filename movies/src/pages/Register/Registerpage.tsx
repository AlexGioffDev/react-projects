import { useStore } from "../../store/store";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, createUser, getUserData } from "../../config/firebase";
import { useNavigate, Link } from "react-router-dom";

const Registerpage = () => {
  const { setUser, setError, error } = useStore();
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const fd = new FormData(event.target as HTMLFormElement);
    const data = Object.fromEntries(fd.entries());
    const username = String(data["username"]);
    const email = String(data["email"]);
    const password = String(data["password"]);

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      setError(null);

      const { user } = userCredential;

      await createUser(user.uid, email, username);

      const userData = await getUserData(user);
      if (userData) {
        setUser(userData);
        return navigate("/");
      }
    } catch {
      setError("Error! impossible create an user!");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-full h-full">
      <div className="flex flex-col items-center mx-auto w-[50%] border rounded-3xl border-slate-950 p-8 gap-y-4 ">
        <h3 className="text-center uppercase font-bold text-4xl">Register</h3>
        <form
          className="flex justify-center flex-col gap-y-8 items-center"
          onSubmit={handleSubmit}
        >
          <div className="flex gap-x-12 flex-1 items-center ">
            <label
              htmlFor="username"
              className="text-slate-700 font-semibold uppercase text-sm w-20 "
            >
              Username
            </label>
            <input
              className="border-slate-600 py-1 px-2 text-lg text-slate-950 bg-slate-100 rounded-lg"
              type="username"
              name="username"
              id="username"
            />
          </div>
          <div className="flex gap-x-12 flex-1 items-center ">
            <label
              htmlFor="email"
              className="text-slate-700 font-semibold uppercase text-sm w-20 "
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
          <div className="flex gap-x-12 flex-1 items-center ">
            <label
              htmlFor="password"
              className="text-slate-700 font-semibold uppercase text-sm w-20"
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
          <button type="submit">Register</button>
          <p>
            You have already an account?
            <Link to="/login" className="text-blue-500">
              Login
            </Link>
          </p>
          {error && <p>{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default Registerpage;
