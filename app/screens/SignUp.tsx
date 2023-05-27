import {
  View,
  Text,
  Dimensions,
  KeyboardAvoidingView,
  StyleSheet,
} from "react-native";
import React, { useState } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { LinearGradient } from "expo-linear-gradient";

// React Elements
import { Button, Input } from "@rneui/themed";

// Firebase authentication
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { FIREBASE_AUTH, FIRESTORE_DB } from "../../firebaseConfig";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import {
  addDoc,
  collection,
  doc,
  onSnapshot,
  setDoc,
} from "firebase/firestore";
import { Pressable } from "react-native";
import { COLOR, FONT } from "../../constants";
import { Chip, Icon } from "@rneui/base";

// Get dimensions of device
const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

export interface User {
  username: string;
  email: string;
  id: string;
  areAdmin: boolean;
  points: number;
  groupCode: string;
}

const SignUp: React.FC<NativeStackScreenProps<any>> = ({ navigation }) => {
  //useState to capture fields from inputs and auth user
  const [value, setValue] = useState({
    userName: "",
    email: "",
    password: "",
    confirmPassword: "",
    groupCode: "",
    error: "",
    points: 0,
  });

  async function handleFormSignUp() {
    if (value.email === "" || value.password === "") {
      setValue({
        ...value,
        error: "All fields are mandatory",
      });
      return;
    }

    // if validation passed, create a new account
    try {
      const credentials = await createUserWithEmailAndPassword(
        FIREBASE_AUTH,
        value.email,
        value.password
      );

      // Create a new user document in the "users" collection
      const userDocRef = doc(FIRESTORE_DB, "users", credentials.user.uid);
      await setDoc(userDocRef, {
        userName: value.userName,
        email: value.email,
        points: value.points,
        groupCode: "",
      });

      setValue({ ...value });

      // Push to Home screen
      navigation.navigate("Home Screen");
    } catch (error) {
      setValue({
        ...value,
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  }

  return (
    <KeyboardAvoidingView style={styles.container} behavior="height">
      <View style={{ marginTop: 200, paddingRight: 20 }}>
        {/*Title & Subtitle*/}
        <View style={{ display: "flex" }}>
          <Pressable
            style={styles.adminLinkButton}
            onPress={() => navigation.navigate("Sign In Admin")}
          >
            <Text style={styles.textBtnSignIn}>Entrar como administrador</Text>
            <Icon
              style={{ marginLeft: 5 }}
              name="shield"
              type="feather"
              color="#FFE347"
              onPress={() => console.log("Sign In Admin")}
            />
          </Pressable>
          {!!value.error && <Chip title={"Favor de llenar todos los campos"} />}
          <Text
            style={{
              marginTop: 10,
              fontSize: 50,
              fontWeight: "bold",
              textAlign: "right",
              color: COLOR.black,
              fontFamily: FONT.boldNun,
            }}
          >
            Registrarse
          </Text>
          <Text style={{ fontSize: 16, paddingTop: 5, textAlign: "right" }}>
            Registrate y recibe recompensas por realizar tareas!
          </Text>
        </View>

        {!!value.error && (
          <View>
            <Text>{value.error}</Text>
          </View>
        )}

        {/* Sign Up Form */}
        <View style={styles.container}>
          <View style={{ width: screenWidth * 0.9, marginTop: 50 }}>
            <Input
              placeholder="Nombre de usuario"
              containerStyle={{}}
              value={value.userName}
              onChangeText={(text) => setValue({ ...value, userName: text })}
            />

            <Input
              placeholder="Tu correo"
              containerStyle={{}}
              value={value.email}
              onChangeText={(text) => setValue({ ...value, email: text })}
            />

            <Input
              placeholder="Tu contraseña"
              value={value.password}
              onChangeText={(text) => setValue({ ...value, password: text })}
              secureTextEntry={true}
              showSoftInputOnFocus={true}
            />

            {/* Confirm password */}
            <Input
              placeholder="Confirmar contraseña"
              value={value.confirmPassword}
              onChangeText={(text) =>
                setValue({ ...value, confirmPassword: text })
              }
              secureTextEntry={true}
              showSoftInputOnFocus={true}
            />
          </View>
        </View>

        {/* Sign Up Button */}

        <View
          style={{
            width: screenWidth,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Button
            titleStyle={{ color: COLOR.white }}
            buttonStyle={{ width: screenWidth * 0.9, height: 60 }}
            containerStyle={{
              width: screenWidth * 0.9,
              marginHorizontal: 50,
              marginVertical: 10,
              borderRadius: 25,
            }}
            ViewComponent={LinearGradient} // Don't forget this!
            linearGradientProps={{
              colors: ["#8093F1", "#3E1FFF"],
              start: { x: 0, y: 0.5 },
              end: { x: 1, y: 0.5 },
            }}
            onPress={handleFormSignUp}
          >
            Registrarse
          </Button>

          {/* Forgot Password Button */}
          <Button
            containerStyle={{
              width: screenWidth * 0.9,
              marginHorizontal: 50,
              marginVertical: 10,
            }}
            title="Ya tengo una cuenta"
            type="clear"
            titleStyle={{ color: "rgba(78, 116, 289, 1)" }}
            onPress={() => navigation.navigate("Sign In")}
          />
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLOR.white,
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 40,
  },
  adminLinkButton: {
    position: "absolute",
    right: 30,
    top: -100,
    maxHeight: 50,
    maxWidth: 260,
    paddingHorizontal: 40,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 5,
    borderRadius: 30,
    elevation: 3,
    height: 50,
    color: "#FFFFFF",
    backgroundColor: "#3E1FFF",
  },
  controls: {
    flex: 1,
    backgroundColor: "#000",
  },
  control: {
    marginTop: 10,
  },
  textBtnSignIn: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
  },
  error: {
    marginTop: 10,
    padding: 10,
    color: "#fff",
    backgroundColor: "#D54826FF",
  },
});
