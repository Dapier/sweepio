import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "../app/screens/Home";
import List from "../app/screens/List";
import { COLOR } from "../constants";
import Rewards from "../app/screens/Rewards";
import ToDos from "../app/screens/ToDos";
import Tasks from "../app/screens/Tasks";
import ScreenHeaderProfileBtn from "../components/common/header/ScreenHeaderProfileBtn";
import UserAccount from "../app/screens/UserAccount";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Icon } from "@rneui/base";
import { StyleSheet } from "react-native";
import SignIn from "../app/screens/SignIn";
import TaskDetail from "../app/screens/TaskDetail";

const Stack = createStackNavigator();

export default function UserStack() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          options={{
            headerStyle: {
              backgroundColor: "#fff",
            },
            headerShadowVisible: true,
            headerTitle: "",
            cardStyle: { backgroundColor: "#fff" },
            headerRight: () => (
              <ScreenHeaderProfileBtn screenName={"User Account Screen"} />
            ),
          }}
          name="Home Screen"
          component={Home}
        />

        <Stack.Screen
          options={{
            headerStyle: {
              backgroundColor: "transparent",
            },
            headerShadowVisible: false,
            headerTitle: "",
            headerRight: () => (
              <ScreenHeaderProfileBtn screenName={"User Account Screen"} />
            ),
            cardStyle: { backgroundColor: "#fff" },
          }}
          name="User Tasks Screen"
          component={Tasks}
        />

        <Stack.Screen
          options={{
            headerStyle: {
              backgroundColor: "transparent",
            },
            headerShadowVisible: false,
            headerTitle: "",
            headerRight: () => (
              <ScreenHeaderProfileBtn screenName={"User Account Screen"} />
            ),
            cardStyle: { backgroundColor: "#fff" },
          }}
          name="Rewards Screen"
          component={Rewards}
        />
        <Stack.Screen
          options={{
            headerStyle: {
              backgroundColor: "transparent",
            },
            headerShadowVisible: false,
            headerTitle: "",
            cardStyle: { backgroundColor: "#fff" },
          }}
          name="User Account Screen"
          component={UserAccount}
        />
        <Stack.Screen
          options={{
            headerStyle: {
              backgroundColor: "transparent",
            },
            headerShadowVisible: false,
            headerTitle: "",
            cardStyle: { backgroundColor: "#fff" },
            headerRight: () => (
              <ScreenHeaderProfileBtn screenName={"User Account Screen"} />
            ),
          }}
          name="ToDo Screen"
          component={List}
        />

        <Stack.Screen
          options={{
            headerStyle: {
              backgroundColor: "transparent",
            },
            headerShadowVisible: false,
            headerTitle: "",
            cardStyle: { backgroundColor: "#fff" },
            headerRight: () => (
              <ScreenHeaderProfileBtn screenName={"User Account Screen"} />
            ),
          }}
          name="Task Detail Screen"
          component={TaskDetail}
        />

        <Stack.Screen
          name="Sign In"
          component={SignIn}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
