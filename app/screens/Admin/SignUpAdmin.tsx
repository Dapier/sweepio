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
import { FIREBASE_AUTH, FIRESTORE_DB } from "../../../firebaseConfig";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import { collection, onSnapshot } from "firebase/firestore";

// Get dimensions of device
const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

export interface User {}

const SignUpAdmin: React.FC<NativeStackScreenProps<any>> = ({ navigation }) => {
  //useState to capture fields from inputs and auth user
  const [value, setValue] = useState({
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
    error: "",
  });

  // useEffect(() => {
  //   const userRef = collection(FIRESTORE_DB, "users");

  //   const suscriber = onSnapshot(userRef, {
  //     next: (snapshot) => {
  //       const users: User[] = [];
  //     },
  //   });

  //   return () => {
  //     second;
  //   };
  // }, [third]);

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
      await createUserWithEmailAndPassword(
        FIREBASE_AUTH,
        value.email,
        value.password
      );
      //push to Home screen
      navigation.navigate("List");
    } catch (error) {
      setValue({
        ...value,
        error: error instanceof Error ? error.message : "Unknow error",
      });
    }
  }

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <View style={{ marginTop: 200, paddingRight: 20 }}>
        {/*Title & Subtitle*/}
        <Text
          style={{
            fontSize: 50,
            fontWeight: "bold",
            textAlign: "right",
          }}
        >
          Registrarse
        </Text>
        {!!value.error && (
          <View>
            <Text>{value.error}</Text>
          </View>
        )}
        <View style={{ width: screenWidth * 0.9, marginTop: 10 }}>
          <Text
            style={{
              color: "black",
              left: 20,
              marginTop: 0,
              marginBottom: 0,
            }}
          >
            Username
          </Text>
        </View>
        <TextInput
          style={{
            height: 50,
            width: screenWidth * 0.9,
            borderColor: "#1C1C1C",
            borderWidth: 1,
            color: "black",
            paddingHorizontal: 20,
            margin: 20,
            marginBottom: 0,
          }}
          placeholderTextColor={"rgba(0, 0, 0, 0.5)"}
          placeholder={"Your username"}
          //Capture data, its something like  keylogger
          value={value.username}
          onChangeText={(e) => setValue({ ...value, username: e })}
        />

        {/* Email Field */}
        <View style={{ width: screenWidth * 0.9, marginTop: 10 }}>
          <Text
            style={{
              color: "black",
              left: 20,
              marginTop: 5,
              marginBottom: 0,
            }}
          >
            Email
          </Text>
        </View>

        <TextInput
          style={{
            height: 50,
            width: screenWidth * 0.9,
            borderColor: "#1C1C1C",
            borderWidth: 1,
            color: "black",
            paddingHorizontal: 20,
            margin: 20,
            marginBottom: 0,
          }}
          placeholderTextColor={"rgba(0, 0, 0, 0.5)"}
          placeholder={"example@gmail.com"}
          value={value.email}
          onChangeText={(e) => setValue({ ...value, email: e })}
        />

        {/* Password section */}
        <View style={{ flexDirection: "row" }}>
          <View style={{ flexDirection: "column" }}>
            {/* Password Field */}
            <View style={{ width: screenWidth * 0.3, marginTop: 10 }}>
              <Text style={{ color: "black", left: 20, marginTop: 5 }}>
                Password
              </Text>
            </View>

            <TextInput
              style={{
                height: 50,
                width: screenWidth * 0.4,
                borderColor: "#1C1C1C",
                borderWidth: 1,
                color: "black",
                paddingHorizontal: 20,
                margin: 20,
              }}
              secureTextEntry={true}
              placeholderTextColor={"rgba(0, 0, 0, 0.5)"}
              placeholder={"At least 5 characters"}
              value={value.password}
              onChangeText={(e) => setValue({ ...value, password: e })}
            />
          </View>

          <View style={{ flexDirection: "column" }}>
            {/* Repeat Password */}
            <View style={{ width: screenWidth * 0.3, marginTop: 10 }}>
              <Text style={{ color: "black", left: 20, marginTop: 5 }}>
                Confirm Password
              </Text>
            </View>

            <TextInput
              style={{
                height: 50,
                width: screenWidth * 0.4,
                borderColor: "#1C1C1C",
                borderWidth: 1,
                color: "black",
                paddingHorizontal: 20,
                margin: 20,
              }}
              secureTextEntry={true}
              placeholderTextColor={"rgba(0, 0, 0, 0.5)"}
              placeholder={"Repeat password"}
              value={value.confirmPassword}
              onChangeText={(e) => setValue({ ...value, confirmPassword: e })}
              // onChangeText={input=>this.setState({repeat: input})}
              //   value={this.state.repeat}
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
            containerStyle={{
              height: 40,
              width: screenWidth * 0.9,
              marginHorizontal: 50,
              marginVertical: 10,
              borderRadius: 5,
            }}
            ViewComponent={LinearGradient} // Don't forget this!
            linearGradientProps={{
              colors: ["#8093F1", "#72DDF7"],
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

export default SignUpAdmin;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  controls: {
    flex: 1,
    backgroundColor: "#000",
  },
  control: {
    marginTop: 10,
  },
  error: {
    marginTop: 10,
    padding: 10,
    color: "#fff",
    backgroundColor: "#D54826FF",
  },
});
