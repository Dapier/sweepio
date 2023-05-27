import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyC5fu8TxxIMab7O1m_d2pH--uyuU88R_Io",
  authDomain: "sweepio.firebaseapp.com",
  projectId: "sweepio",
  storageBucket: "sweepio.appspot.com",
  messagingSenderId: "376212662974",
  appId: "1:376212662974:web:6784dad40937f266e64cef",
};

const app = initializeApp(firebaseConfig);
export const FIRESTORE_DB = getFirestore(app);
export const FIREBASE_AUTH = getAuth(app);

export default app;
