import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "../app/screens/Home";
import List from "../app/screens/List";
import { COLOR } from "../constants";
import Rewards from "../app/screens/Rewards";
import ToDos from "../app/screens/ToDos";

const Stack = createStackNavigator();

export default function UserStack() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          options={{
            headerStyle: {
              backgroundColor: COLOR.lightBlue,
            },
            headerShadowVisible: false,
            headerTitle: "",
          }}
          name="Home Screen"
          component={Home}
        />

        <Stack.Screen
          options={{
            headerStyle: {
              backgroundColor: COLOR.lightBlue,
            },
            headerShadowVisible: false,
            headerTitle: "",
          }}
          name="Todos Screen"
          component={ToDos}
        />

        <Stack.Screen
          options={{
            headerStyle: {
              backgroundColor: "transparent",
            },
            headerShadowVisible: false,
            headerTitle: "",
          }}
          name="Rewards Screen"
          component={Rewards}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
