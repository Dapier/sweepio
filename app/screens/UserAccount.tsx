import { View, Text, Button, StyleSheet, Dimensions } from "react-native";
import React, { useEffect, useState } from "react";
import { TouchableOpacity } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLOR, SIZES } from "../../constants";
import { SHADOWS } from "../../constants/theme";
import { getAuth, signOut } from "firebase/auth";
import { Input } from "@rneui/base";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

export interface Todo {
  title: string;
  done: boolean;
  id: string;
}

const auth = getAuth();

const UserAccount: React.FC<NativeStackScreenProps<any>> = ({
  navigation,
}: any) => {
  async function handleSignOut() {
    try {
      await signOut(auth);
      //push to Home screen
      navigation.navigate("Sign In");
    } catch (error) {}
  }

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <View
          style={{ display: "flex", flexDirection: "column", maxHeight: "80%" }}
        >
          <Text style={styles.titleUserAccount}>Mi cuenta</Text>
          <View style={{ width: "50%", marginVertical: 30 }}>
            <Text style={{ fontSize: 20 }}>Correo</Text>
            <Input disabled defaultValue="josuea501@gmail.com" />
          </View>
          <TouchableOpacity style={styles.btnContainer} onPress={handleSignOut}>
            <Text style={{ color: COLOR.white }}>Cerrar sesión</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default UserAccount;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
    backgroundColor: "#FFF",
  },
  titleUserAccount: {
    fontSize: 25,
    fontWeight: "600",
    marginVertical: 20,
  },

  btnContainer: {
    width: "100%",
    height: 50,
    display: "flex",
    marginTop: 345,
    marginRight: 15,
    backgroundColor: "#EF767A",
    borderRadius: SIZES.xLarge / 1.25,
    justifyContent: "center",
    alignItems: "center",
    ...SHADOWS.large,
  },
});
