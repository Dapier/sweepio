import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  KeyboardAvoidingView,
  Pressable,
} from "react-native";
import React, { useState } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { FONT } from "../../../constants";
import { COLOR, SHADOWS } from "../../../constants/theme";
// Firebase authentication
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import { Icon, Input } from "@rneui/base";
import { Button, Chip } from "@rneui/themed";
import { LinearGradient } from "expo-linear-gradient";
import { useAutentication } from "../../../utils/useAuthentication";
const auth = getAuth();

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

const SignInAdmin: React.FC<NativeStackScreenProps<any>> = ({ navigation }) => {
  //Create useState to capture fields from inputs and auth user
  const [value, setValue] = useState({
    email: "",
    password: "",
    error: "",
  });
  const user = getAuth().currentUser?.uid;

  async function handleFormSignInAdmin() {
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
      navigation.navigate("Home Screen Admin");
    } catch (error) {
      setValue({
        ...value,
        error: error instanceof Error ? error.message : "Unknow Error",
      });
    }
  }

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <View style={{ marginTop: 150, paddingLeft: 20 }}>
        <View style={{ display: "flex" }}>
          <Pressable
            style={styles.adminLinkButton}
            onPress={() => navigation.navigate("Sign In")}
          >
            <Text style={styles.textBtnSignIn}>Entrar como usuario</Text>
            <Icon
              style={{ marginLeft: 5 }}
              name="user"
              type="feather"
              color="#72D7F6"
            />
          </Pressable>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              width: "90%",
            }}
          >
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
            <Icon
              raised
              name="crown"
              color={COLOR.starYellow}
              type="foundation"
              size={20}
            />
          </View>
          <Text style={{ fontSize: 16, paddingTop: 5 }}>
            Crea tareas de una manera sencilla y eficiente.
          </Text>
        </View>

        <View>
          <View style={{ width: screenWidth * 0.9, marginTop: 50 }}>
            <Input
              rightIcon={{
                type: "material-community",
                name: "email",
              }}
              placeholder="Tu correo"
              containerStyle={{}}
              value={value.email}
              onChangeText={(text) => setValue({ ...value, email: text })}
            />

            <Input
              rightIcon={{
                type: "material-community",
                name: "lock",
              }}
              placeholder="Tu contraseña"
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
            onPress={handleFormSignInAdmin}
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
            onPress={() => navigation.navigate("Sign Up Admin")}
          />
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default SignInAdmin;

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLOR.white,
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
