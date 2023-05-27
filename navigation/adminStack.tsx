import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "../app/screens/Home";
import List from "../app/screens/List";
import { COLOR } from "../constants";
import Rewards from "../app/screens/Rewards";
import ToDos from "../app/screens/ToDos";
import HomeAdmin from "../app/screens/Admin/HomeAdmin";
import ScreenHeaderProfileBtn from "../components/common/header/ScreenHeaderProfileBtn";
import ScreenHeaderAdminProfileBtn from "../components/common/header/ScreenHeaderAdminProfileBtn";
import AddRewards from "../app/screens/Admin/AddRewards";
import ValidateTasks from "../app/screens/Admin/ValidateTasks";
import AddTasks from "../app/screens/Admin/AddTasks";
import UserAccount from "../app/screens/UserAccount";
import AdminAccount from "../app/screens/Admin/AdminAccount";
import TaskDetails from "../app/screens/tasks_details/[id]";
import TaskDetailAdmin from "../app/screens/Admin/TaskDetailAdmin";

const Stack = createStackNavigator();

// Basically, if a user have a admin role, can see this screens
export default function AdminStack() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          options={{
            headerStyle: {
              backgroundColor: COLOR.white,
            },
            headerShadowVisible: false,
            headerTitle: "",
            headerRight: () => (
              <ScreenHeaderAdminProfileBtn
                screenName={"Admin Account Screen"}
              />
            ),
          }}
          name="Home Screen Admin"
          component={HomeAdmin}
        />

        <Stack.Screen
          options={{
            headerStyle: {
              backgroundColor: COLOR.white,
            },
            headerShadowVisible: false,
            headerTitle: "",
            headerRight: () => (
              <ScreenHeaderAdminProfileBtn
                screenName={"Admin Account Screen"}
              />
            ),
          }}
          name="Validate Tasks Screen"
          component={ValidateTasks}
        />

        <Stack.Screen
          options={{
            headerStyle: {
              backgroundColor: COLOR.white,
            },
            headerShadowVisible: false,
            headerTitle: "",
            headerRight: () => (
              <ScreenHeaderAdminProfileBtn
                screenName={"Admin Account Screen"}
              />
            ),
          }}
          name="Add Tasks Screen"
          component={AddTasks}
        />

        <Stack.Screen
          options={{
            headerStyle: {
              backgroundColor: COLOR.white,
            },
            headerShadowVisible: false,
            headerTitle: "",
            headerRight: () => (
              <ScreenHeaderAdminProfileBtn
                screenName={"Admin Account Screen"}
              />
            ),
          }}
          name="Add Rewards Screen"
          component={AddRewards}
        />

        <Stack.Screen
          options={{
            headerStyle: {
              backgroundColor: COLOR.white,
            },
            headerShadowVisible: false,
            headerTitle: "",
            cardStyle: { backgroundColor: "#fff" },
          }}
          name="Admin Account Screen"
          component={AdminAccount}
        />

        <Stack.Screen
          options={{
            headerStyle: {
              backgroundColor: COLOR.white,
            },
            headerShadowVisible: false,
            headerTitle: "",
            cardStyle: { backgroundColor: "#fff" },
          }}
          name="Admin Task Details"
          component={TaskDetailAdmin}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
