import { View, Text } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLOR } from "../../../constants";
import { createStackNavigator } from "@react-navigation/stack";
import { ScrollView } from "react-native-gesture-handler";
import { Button, Chip } from "@rneui/themed";
import { LinearGradient } from "expo-linear-gradient";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

const Stack = createStackNavigator();
const HomeAdmin: React.FC<NativeStackScreenProps<any>> = ({ navigation }) => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLOR.lightBlue }}>
      <View
        style={{
          display: "flex",
          justifyContent: "space-evenly",
          height: "80%",
        }}
      >
        <View>
          <Text>This is home admin lol</Text>
          <Button
            title="Tareas pendientes"
            icon={{
              name: "clipboard-outline",
              type: "ionicon",
              size: 30,
              color: "white",
            }}
            iconRight
            iconContainerStyle={{ marginLeft: 10 }}
            titleStyle={{ fontWeight: "400", fontSize: 30 }}
            buttonStyle={{
              borderColor: "transparent",
              borderWidth: 0,
              padding: 30,
              borderRadius: 10,
            }}
            ViewComponent={LinearGradient}
            linearGradientProps={{
              colors: ["#8093F1", "#72DDF7"],
              start: { x: 0, y: 0.5 },
              end: { x: 1, y: 0.5 },
            }}
            containerStyle={{
              width: "80%",
              marginHorizontal: 50,
              marginVertical: 10,
            }}
            onPress={() => navigation.navigate("Todos Screen")}
          />
          <Button
            title="Ver Recompensas"
            icon={{
              name: "star",
              type: "ionicon",
              size: 30,
              color: "yellow",
            }}
            iconRight
            iconContainerStyle={{ marginLeft: 10 }}
            titleStyle={{ fontWeight: "400", fontSize: 30 }}
            buttonStyle={{
              borderColor: "transparent",
              borderWidth: 0,
              padding: 30,
              borderRadius: 10,
            }}
            ViewComponent={LinearGradient}
            linearGradientProps={{
              colors: ["#23F0C7", "#FFEE8D"],
              start: { x: 0, y: 0.5 },
              end: { x: 1, y: 0.5 },
            }}
            containerStyle={{
              width: "80%",
              marginHorizontal: 50,
              marginVertical: 10,
            }}
            onPress={() => navigation.navigate("Rewards Screen")}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default HomeAdmin;
