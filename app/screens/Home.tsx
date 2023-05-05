import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLOR, SIZES } from "../../constants";
import Welcome from "../../components/common/home/welcome/Welcome";
import { createStackNavigator } from "@react-navigation/stack";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { Button, Chip } from "@rneui/themed";
import { LinearGradient } from "expo-linear-gradient";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Icon } from "@rneui/base";
import { SHADOWS } from "../../constants/theme";

const Home: React.FC<NativeStackScreenProps<any>> = ({ navigation }) => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLOR.white }}>
      <View
        style={{
          display: "flex",
          justifyContent: "space-around",
          height: "90%",
        }}
      >
        <View style={{ flex: 1, marginBottom: 100 }}>
          <TouchableOpacity
            style={styles.btnContainer}
            onPress={() => navigation.navigate("User Account Screen")}
          >
            <Icon name="user" type="feather" color="#72D7F6" />
          </TouchableOpacity>
          <Welcome />
        </View>
        <View>
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
            onPress={() => navigation.navigate("User Tasks Screen")}
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

export default Home;

const styles = StyleSheet.create({
  btnContainer: {
    width: 50,
    height: 50,
    display: "flex",
    marginTop: 15,
    marginRight: 15,
    backgroundColor: COLOR.white,
    borderRadius: SIZES.xLarge / 1.25,
    justifyContent: "center",
    alignItems: "center",
    ...SHADOWS.large,
  },
});
