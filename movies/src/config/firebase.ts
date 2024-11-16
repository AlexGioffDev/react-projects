import { initializeApp } from "firebase/app";
import { getAuth, User } from "firebase/auth";
import { getDatabase, ref, set, get } from "firebase/database";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  databaseURL: import.meta.env.VITE_FIREBASE_DB_URL,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

export const database = getDatabase(app);

export const createUser = async (
  userId: string,
  email: string,
  username: string
) => {
  const generatedAvatarUrl = `https://ui-avatars.com/api/?name=${username
    .charAt(0)
    .toUpperCase()}&background=random&color=fff`;

  set(ref(database, "users/" + userId), {
    username: username,
    email: email,
    createdAt: new Date().toISOString(),
    avatarURL: generatedAvatarUrl,
  })
    .then(() => console.log("User created!"))
    .catch((err) => console.log("error: ", err));
};

export const getUserData = async (user: User) => {
  try {
    const userRef = ref(database, "users/" + user.uid);
    const snapshot = await get(userRef);

    if (snapshot.exists()) {
      const userData = snapshot.val();
      return {
        username: userData.username,
        uid: userData.uid,
        avatarURL: userData.avatarURL,
      };
    } else {
      console.log("User data not found in database.");
      return null;
    }
  } catch (error) {
    console.error("Error fetching user data:", error);
    return null;
  }
};
