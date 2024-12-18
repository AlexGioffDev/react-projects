import { signOut } from "firebase/auth";
import { auth } from "../../config/firebase";
import { useStore } from "../../store/store";

export const Homepage = () => {
  const { user, setUser, setError } = useStore();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUser(null);
    } catch {
      setError("Error");
    }
  };

  return (
    <>
      <p>Hello, {user?.username}</p>
      <img
        src={user?.avatarURL}
        className="w-12 h-12 object-cover rounded-full"
      />
      <button onClick={handleLogout}>Logout</button>
    </>
  );
};
