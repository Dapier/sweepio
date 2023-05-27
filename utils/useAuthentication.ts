import React from "react";
import { getAuth, onAuthStateChanged, User } from "firebase/auth";
import { FIREBASE_AUTH } from "../firebaseConfig";

const auth = getAuth();
export function useAutentication() {
  const [user, setUser] = React.useState<User>();
  React.useEffect(() => {
    const unsubscribeFromAuthStatuChanged = onAuthStateChanged(
      FIREBASE_AUTH,
      (user) => {
        if (user) {
          //if user is signed in
          setUser(user);
          
        } else {
          //user is sign out
          setUser(undefined);
        }
      }
    );
    return unsubscribeFromAuthStatuChanged;
  }, []);
  return {
    user,
  };
}
