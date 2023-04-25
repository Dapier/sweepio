import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../app/screens/Home";
import SignIn from "../app/screens/SignIn";

import Signup from "../app/screens/SignUp";
import List from "../app/screens/List";
import Rewards from "../app/screens/Rewards";
import SignInAdmin from "../app/screens/Admin/SignInAdmin";
import SignUpAdmin from "../app/screens/Admin/SignUpAdmin";

const Stack = createNativeStackNavigator();

export default function AuthStack() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Sign In"
          component={SignIn}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Sign Up"
          component={Signup}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Sign In Admin"
          component={SignInAdmin}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Sign Up Admin"
          component={SignUpAdmin}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
