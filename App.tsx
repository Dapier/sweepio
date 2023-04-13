import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import List from "./app/screens/List";
import Details from "./app/screens/Details";
import RootNavigation from "./navigation";
import { useFonts } from "expo-font";
import { useCallback, useEffect } from "react";
import * as SplashScreen from "expo-splash-screen";
const Stack = createNativeStackNavigator();

export default function App() {
  const [fontsLoaded] = useFonts({
    NunitoBold: require("./assets/fonts/Nunito-Bold.ttf"),
    NunitoMedium: require("./assets/fonts/Nunito-Medium.ttf"),
    NunitoRegular: require("./assets/fonts/Nunito-Regular.ttf"),
    OpSansBold: require("./assets/fonts/OpenSans-Bold.ttf"),
    OpSansLight: require("./assets/fonts/OpenSans-Light.ttf"),
    OpSansMedium: require("./assets/fonts/OpenSans-Medium.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }

  return <RootNavigation />;
}

const styles = StyleSheet.create({
  container: {},
});
