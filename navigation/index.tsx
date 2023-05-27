import React, { useEffect, useState } from "react";
import { useAutentication } from "../utils/useAuthentication";
import AuthStack from "./AuthStack";
import UserStack from "./userStack";
import AdminStack from "./adminStack";
import { FIRESTORE_DB } from "../firebaseConfig";
import {
  Firestore,
  collection,
  doc,
  documentId,
  getDoc,
  getDocs,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";

export interface Admin {
  id: string;
  email: string;
  groupCode: string;
  userName: string;
}

export default function RootNavigation() {
  const [admins, setAdmins] = useState<Admin[]>([]);
  const credentials = getAuth().currentUser?.uid;
  let userAdmin = false;
  const userID = useAutentication();
  useEffect(() => {
    const adminsRef = collection(FIRESTORE_DB, "admins");

    const suscriber = onSnapshot(adminsRef, {
      next: (snap) => {
        const admins: Admin[] = [];
        snap.docs.forEach((doc) => {
          admins.push({
            id: doc.id,
            ...doc.data(),
          } as Admin);
        });
        setAdmins(admins);
      },
    });
    return () => suscriber();
  }, []);

  const adminFound = admins.find((obj) => {
    return obj.id === userID.user?.uid;
  });

  adminFound ? (userAdmin = true) : (userAdmin = false);

  console.log(userAdmin);

  // If user are authenticated, redirect to home page
  return userAdmin ? (
    <AdminStack />
  ) : userID.user?.uid ? (
    <UserStack />
  ) : (
    <AuthStack />
  );
  // return userID.user?.uid === undefined || false ? (
  //   <AuthStack />
  // ) : userAdmin ? (
  //   <AdminStack />
  // ) : (
  //   <AuthStack />
  // );
}
