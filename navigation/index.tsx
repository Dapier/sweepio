import React from "react";
import { useAutentication } from "../utils/useAuthentication";
import AuthStack from "./AuthStack";
import UserStack from "./userStack";

export default function RootNavigation() {
  const { user } = useAutentication();
  // If user are authenticated, redirect to home page
  return user ? <UserStack /> : <AuthStack />;
}
