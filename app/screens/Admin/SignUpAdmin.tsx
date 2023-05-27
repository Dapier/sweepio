import {
  View,
  Text,
  Dimensions,
  KeyboardAvoidingView,
  StyleSheet,
  ToastAndroid,
} from "react-native";
import React, { useEffect, useState } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { LinearGradient } from "expo-linear-gradient";

// React Elements
import { Button, Input } from "@rneui/themed";

// Firebase authentication
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { FIREBASE_AUTH, FIRESTORE_DB } from "../../../firebaseConfig";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import {
  addDoc,
  collection,
  doc,
  onSnapshot,
  setDoc,
} from "firebase/firestore";
import { Pressable } from "react-native";
import { COLOR, FONT } from "../../../constants";
import { Chip, Icon } from "@rneui/base";

// Get dimensions of device
const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

export interface User {
  username: string;
  email: string;
  id: string;
  groupCode: string;
}

const SignUpAdmin: React.FC<NativeStackScreenProps<any>> = ({ navigation }) => {
  //useState to capture fields from inputs and auth user
  const [value, setValue] = useState({
    userName: "",
    groupCode: "",
    email: "",
    password: "",
    confirmPassword: "",
    error: "",
  });

  async function handleFormSignUp() {
    if (value.email === "" || value.password === "") {
      setValue({
        ...value,
        error: "All fields are mandatory",
      });
      return;
    }

    //if doesnt error (validation passed)
    //once validation are passed, create a new account
    try {
      const credentials = await createUserWithEmailAndPassword(
        FIREBASE_AUTH,
        value.email,
        value.password
      );

      //Once user was created, add user form data in "admin" collection using UID has id
      // const newAdmin = new User(value.userName, value.groupCode);
      await setDoc(doc(FIRESTORE_DB, "admins", credentials.user.uid), {
        userName: value.userName,
        groupCode: value.groupCode,
        email: value.email,
      });
      setValue({ ...value });
      //push to Home screen
      navigation.navigate("Home Screen Admin");
    } catch (error) {
      setValue({
        ...value,
        error: error instanceof Error ? error.message : "Unknow error",
      });
    }
  }

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <View style={{ marginTop: 90, paddingRight: 20 }}>
        {/*Title & Subtitle*/}
        <View style={{ display: "flex", marginTop: 60 }}>
          <Pressable
            style={styles.adminLinkButton}
            onPress={() => navigation.navigate("Sign In Admin")}
          >
            <Text style={styles.textBtnSignIn}>Registrar como usuario</Text>
            <Icon
              style={{ marginLeft: 5 }}
              name="user"
              type="feather"
              color="#FFE347"
              onPress={() => console.log("Sign Up")}
            />
          </Pressable>
          {!!value.error && <Chip title={"Favor de llenar todos los campos"} />}
          <Text
            style={{
              marginTop: 10,
              fontSize: 40,
              fontWeight: "bold",
              textAlign: "right",
              color: COLOR.black,
              fontFamily: FONT.boldNun,
            }}
          >
            Registrarse
          </Text>
          <Text style={{ fontSize: 16, paddingTop: 5, textAlign: "right" }}>
            Crea un grupo y compartelo para que puedan realizar tus tareas!.
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
              label={"Nombre de usuario"}
              rightIcon={{
                type: "material-community",
                name: "account",
              }}
              placeholder="Tu nombre de usuario"
              containerStyle={{}}
              value={value.userName}
              onChangeText={(text) => setValue({ ...value, userName: text })}
            />
            <Input
              label={"Codigo de tu grupo"}
              rightIcon={{
                type: "material-community",
                name: "account-group-outline",
              }}
              placeholder="Nombre del grupo de tareas"
              containerStyle={{}}
              value={value.groupCode}
              onChangeText={(text) => setValue({ ...value, groupCode: text })}
            />
            <Input
              label={"Correo"}
              rightIcon={{
                type: "material-community",
                name: "email",
              }}
              placeholder="Tu correo"
              containerStyle={{}}
              value={value.email}
              onChangeText={(text) => setValue({ ...value, email: text })}
            />

            <View
              style={{
                display: "flex",
                flexDirection: "row",
                width: screenWidth * 0.9,
                alignItems: "center",
              }}
            >
              <Input
                containerStyle={{ width: "50%" }}
                label={"Contraseña"}
                rightIcon={{
                  type: "material-community",
                  name: "lock",
                }}
                placeholder="Mayor a 6 caracteres"
                value={value.password}
                onChangeText={(text) => setValue({ ...value, password: text })}
                secureTextEntry={true}
                showSoftInputOnFocus={true}
              />

              {/* Confirm password */}
              <Input
                label={"Confirmar contraseña"}
                containerStyle={{ width: "50%" }}
                placeholder="Mayor a 6 caracteres"
                value={value.confirmPassword}
                onChangeText={(text) =>
                  setValue({ ...value, confirmPassword: text })
                }
                secureTextEntry={true}
                showSoftInputOnFocus={true}
              />
            </View>
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
              colors: ["#8093F1", "#72DDF7"],
              start: { x: 0, y: 0.5 },
              end: { x: 1, y: 0.5 },
            }}
            onPress={handleFormSignUp}
          >
            Entrar
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
            onPress={() => navigation.navigate("Sign In Admin")}
          />
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default SignUpAdmin;

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLOR.white,
    justifyContent: "center",
    alignItems: "center",
  },
  controls: {
    flex: 1,
    backgroundColor: "#000",
  },
  control: {
    marginTop: 10,
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
  textBtnSignIn: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
  },
});
