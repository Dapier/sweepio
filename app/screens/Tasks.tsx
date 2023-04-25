import { View, Text, Button, StyleSheet, Dimensions } from "react-native";
import React, { useEffect, useState } from "react";
import { FIRESTORE_DB } from "../../firebaseConfig";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  snapshotEqual,
  updateDoc,
} from "firebase/firestore";
import { TextInput } from "react-native";
import { KeyboardAvoidingView } from "react-native";
import { FlatList } from "react-native";
import { TouchableOpacity } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Entypo } from "@expo/vector-icons";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

export interface Todo {
  title: string;
  done: boolean;
  id: string;
}

const Tasks = ({ navigation }: any) => {
  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <View style={styles.container}>
        <Text>Tareas</Text>
      </View>
    </KeyboardAvoidingView>
  );
};

export default Tasks;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    marginVertical: screenHeight * 0.1,
  },
  form: {
    flexDirection: "column",
  },
  input: {
    height: 50,
    borderColor: "#7267CB",
    borderWidth: 1,
    paddingHorizontal: 20,
    marginBottom: 10,
    backgroundColor: "#fff",
    borderRadius: 4,
  },
  todoContainer: {
    display: "flex",
    width: screenWidth * 0.8,
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    marginVertical: 9,
    shadowColor: "#dfdfdf",
    elevation: 20,
    backgroundColor: "#ffff",
    borderRadius: 9,
  },
  todo: {
    flexDirection: "row",
    flex: 1,
    alignItems: "center",
  },
  todoText: {
    flex: 1,
    paddingHorizontal: 5,
  },
});
