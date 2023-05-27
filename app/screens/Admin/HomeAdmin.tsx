import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLOR } from "../../../constants";
import { createStackNavigator } from "@react-navigation/stack";
import { ScrollView } from "react-native-gesture-handler";
import { Button, Chip } from "@rneui/themed";
import { LinearGradient } from "expo-linear-gradient";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import styles from "../../../components/common/home/welcome/welcome.style";
import {
  QuerySnapshot,
  collection,
  doc,
  getDoc,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";

import { FIRESTORE_DB } from "../../../firebaseConfig";
import { getAuth } from "firebase/auth";
import { useAutentication } from "../../../utils/useAuthentication";
import { Card, ScreenWidth } from "@rneui/base";
import { SHADOWS, SIZES } from "../../../constants/theme";

export interface Admin {
  id: string;
  email: string;
  groupCode: string;
  userName: string;
}

const HomeAdmin: React.FC<NativeStackScreenProps<any>> = ({ navigation }) => {
  const adminRef = collection(FIRESTORE_DB, "admins");
  const [adminData, setAdminData] = useState({});
  const userID = useAutentication();
  const userIDFormat = userID.user?.uid;

  //Getting admin data from admins collection using her ID
  useEffect(() => {
    async function loadData() {
      const adminDataRef = doc(FIRESTORE_DB, "admins", userID.user?.uid);
      const adminDocSnap = await getDoc(adminDataRef);
      const data = adminDocSnap.data();
      try {
        setAdminData(data);
      } catch (e) {
        console.log("Error: ", e);
      }
    }

    loadData();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLOR.white }}>
      <View
        style={{
          display: "flex",
          justifyContent: "space-evenly",
          height: "80%",
        }}
      >
        <View style={{ marginLeft: 20, maxWidth: "50%" }}>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              alignContent: "center",
            }}
          >
            <Text style={{ fontWeight: "100", fontSize: 35 }}>
              Bienvenido,{" "}
            </Text>
            <Text style={{ fontWeight: 500, fontSize: 35 }}>
              {adminData.userName}
            </Text>
          </View>
          <Text style={{ fontWeight: "300", fontSize: 20 }}>
            ¿Qué deseas hacer hoy?
          </Text>
        </View>
        <View>
          <Button
            title="Agregar tareas"
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
            onPress={() => navigation.navigate("Add Tasks Screen")}
          />
          <Button
            title="Agregar Recompensas"
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
            onPress={() => navigation.navigate("Add Rewards Screen")}
          />
        </View>

        <View>
          <Card
            containerStyle={{
              borderRadius: 20,
              ...SHADOWS.large,
              maxHeight: 120,
              marginVertical: 10,
            }}
          >
            <Text style={{ fontSize: 20, fontWeight: "600" }}>Mi Grupo:</Text>
            <Text style={{ fontSize: 30 }}>{adminData.groupCode}</Text>
          </Card>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default HomeAdmin;
