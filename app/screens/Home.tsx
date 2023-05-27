import { View, Text, StyleSheet, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLOR, SIZES, images } from "../../constants";
import Welcome from "../../components/common/home/welcome/Welcome";

import { createStackNavigator } from "@react-navigation/stack";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { Button, Chip, Input } from "@rneui/themed";
import { LinearGradient } from "expo-linear-gradient";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Card, Icon, ScreenWidth } from "@rneui/base";
import { SHADOWS } from "../../constants/theme";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { FIRESTORE_DB } from "../../firebaseConfig";
import { getAuth } from "firebase/auth";

const Home: React.FC<NativeStackScreenProps<any>> = ({ navigation }) => {
  const [userData, setUserData] = useState({});
  const [currentGroup, setCurrentGroup] = useState("");
  const [newGroupCode, setNewGroupCode] = useState("");
  const auth = getAuth();
  const user = auth.currentUser;
  const uid = user?.uid;

  const q = query(
    collection(FIRESTORE_DB, "users"),
    where("__name__", "==", uid)
  );

  useEffect(() => {
    const loadData = async () => {
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        setUserData(data);
      });
    };

    loadData();
  }, [q]);

  const joinGroup = async () => {
    try {
      const userRef = doc(FIRESTORE_DB, "users", uid);
      await updateDoc(userRef, { groupCode: newGroupCode });
      setNewGroupCode("");
    } catch (e) {
      console.log(e);
    }
  };

  const renderWithGroupCode = () => {
    return (
      <>
        <View
          style={{
            display: "flex",
            justifyContent: "space-around",
            height: "95%",
          }}
        >
          <View style={{ flex: 1, marginBottom: 100, height: "20%" }}>
            <Welcome />
          </View>
          <View style={{ display: "flex", alignItems: "center" }}>
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

            <Card
              containerStyle={{
                ...SHADOWS.large,
                maxHeight: 120,
                width: "80%",
                borderRadius: 10,
              }}
            >
              <Text style={{ fontSize: 20, fontWeight: "600" }}>Mi Grupo:</Text>
              <Text style={{ fontSize: 30 }}>{userData.groupCode}</Text>
            </Card>
          </View>
        </View>
      </>
    );
  };

  const renderWithoutGroupCode = () => {
    return (
      <View
        style={{
          display: "flex",
          height: "90%",
          alignContent: "center",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View
          style={{
            width: ScreenWidth,
            justifyContent: "center",
            alignContent: "center",
          }}
        >
          <Image
            source={images.search}
            resizeMode="center"
            style={{ width: ScreenWidth, height: 280 }}
          />
        </View>
        <View
          style={{
            justifyContent: "center",
            alignContent: "center",
            alignItems: "center",
            width: ScreenWidth * 0.7,
          }}
        >
          <Input
            label={"Codigo de grupo"}
            inputStyle={{ width: "100%" }}
            rightIcon={{
              type: "material-community",
              name: "account-group-outline",
            }}
            value={newGroupCode}
            onChangeText={(e: string) => setNewGroupCode(e)}
          />
          <Button
            title="Unirse"
            titleStyle={{ fontWeight: "400", fontSize: 30 }}
            buttonStyle={{
              borderColor: "transparent",
              borderWidth: 0,
              padding: 30,
              borderRadius: 10,
              width: "100%",
            }}
            ViewComponent={LinearGradient}
            linearGradientProps={{
              colors: ["#4B0CD0", "#3E1FFF"],
              start: { x: 0, y: 0.5 },
              end: { x: 1, y: 0.5 },
            }}
            containerStyle={{
              width: "100%",
              marginHorizontal: 50,
              marginVertical: 10,
            }}
            onPress={joinGroup}
          />
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLOR.white }}>
      <>
        {userData.groupCode && userData.groupCode !== ""
          ? renderWithGroupCode()
          : renderWithoutGroupCode()}
      </>
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
  groupContainer: {
    width: "100%",
    height: "100%",
    flexDirection: "column",
    alignItems: "center",
    paddingHorizontal: 20,
  },
});
