import { initializeApp } from "firebase/app";
import {
  User,
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { doc, getFirestore, setDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const auth = getAuth(firebaseApp);

export const logInWithEmailAndPassword = async (
  email: string,
  password: string
): Promise<User | null> => {
  try {
    const res = await signInWithEmailAndPassword(auth, email, password);
    return res.user;
  } catch (err) {
    if (err instanceof Error) {
      // Handle authentication-specific errors gracefully
      console.error(err.message);
      alert(err.message);
    } else {
      console.error("Unexpected error", err);
    }
    return null; // Return null in case of error
  }
};

const db = getFirestore(firebaseApp);
export const registerWithEmailAndPassword = async (
  name: string,
  email: string,
  password: string
): Promise<User | null> => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);

    const userData = {
      uid: res.user.uid,
      name,
      email: res.user.email,
      images: [],
    };

    await setDoc(doc(db, "users", res.user.uid), userData);

    return res.user;
  } catch (err) {
    if (err instanceof Error) {
      // Handle authentication-specific errors gracefully
      console.error(err.message);
      alert(err.message);
    } else {
      console.error("Unexpected error", err);
    }
    return null; // Return null in case of error
  }
};

export const logoutFirebase = () => {
  signOut(auth);
};
