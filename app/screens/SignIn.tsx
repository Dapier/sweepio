import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  KeyboardAvoidingView,
} from "react-native";
import React, { useState } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

// Firebase authentication
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import { Input } from "@rneui/base";
import { Button, Chip } from "@rneui/themed";
import { LinearGradient } from "expo-linear-gradient";
import { FONT } from "../../constants";
import { COLOR } from "../../constants/theme";
const auth = getAuth();

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

const SignIn: React.FC<NativeStackScreenProps<any>> = ({ navigation }) => {
  //Create useState to capture fields from inputs and auth user
  const [value, setValue] = useState({
    email: "",
    password: "",
    error: "",
  });

  async function handleFormSignIn() {
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
      await signInWithEmailAndPassword(auth, value.email, value.password);
      //push to Home screen
      navigation.navigate("Home Screen");
    } catch (error) {
      setValue({
        ...value,
        error: error.message,
      });
    }
  }

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <View style={{ marginTop: 200, paddingLeft: 20 }}>
        <View>
          <Text
            style={{
              marginTop: 50,
              fontSize: 50,
              fontWeight: "bold",
              textAlign: "left",
              color: COLOR.black,
              fontFamily: FONT.boldNun,
            }}
          >
            Iniciar sesion
          </Text>
          <Text style={{ fontSize: 16, paddingTop: 5 }}>
            Llena los campos para entrar y ganar recompensas haciendo tareas!.
          </Text>
        </View>

        <View>
          <View style={{ width: screenWidth * 0.9, marginTop: 50 }}>
            <Input
              placeholder="Tu correo"
              containerStyle={{}}
              value={value.email}
              onChangeText={(text) => setValue({ ...value, email: text })}
            />

            <Input
              placeholder="Tu contraseña"
              containerStyle={StyleSheet.control}
              value={value.password}
              onChangeText={(text) => setValue({ ...value, password: text })}
              secureTextEntry={true}
            />
          </View>
        </View>

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
            onPress={handleFormSignIn}
          >
            Entrar
          </Button>

          <Button
            title="Iniciar sesion con Google"
            buttonStyle={{
              borderColor: "rgba(78, 116, 289, 1)",
            }}
            type="outline"
            raised
            titleStyle={{ color: "rgba(78, 116, 289, 1)" }}
            containerStyle={{
              width: screenWidth * 0.9,
              marginHorizontal: 50,
              marginVertical: 10,
            }}
          />

          <Button
            containerStyle={{
              width: screenWidth * 0.9,
              marginHorizontal: 50,
              marginVertical: 10,
            }}
            title="No tengo una cuenta"
            type="clear"
            titleStyle={{ color: "rgba(78, 116, 289, 1)" }}
            onPress={() => navigation.navigate("Sign Up")}
          />
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default SignIn;

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
});
