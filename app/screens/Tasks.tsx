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
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { Card, Icon } from "@rneui/base";
import { COLOR, SHADOWS } from "../../constants/theme";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

export interface Todo {
  title: string;
  done: boolean;
  id: string;
}

const Tasks = ({ navigation }: any) => {
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <Text style={styles.titleRewards}>Tareas Pendientes</Text>
        <Text style={styles.subTitleRewards}>
          Consigue premios cumpliendo tareas!
        </Text>

        {/* Rewards */}
        <ScrollView style={{ maxHeight: "90%" }}>
          <View style={{ marginTop: 50, height: "100%" }}>
            <Card
              containerStyle={{
                borderRadius: 20,
                ...SHADOWS.large,
                maxHeight: 120,
                marginVertical: 10,
              }}
            >
              <View
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignContent: "center",
                  flexDirection: "row",
                  alignItems: "center",
                  paddingHorizontal: 10,
                }}
              >
                <Text style={{ flex: 1, fontSize: 20, marginTop: 10 }}>
                  Limpiar cuarto
                </Text>
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Text style={{ fontSize: 20 }}> + 120</Text>
                  <Icon
                    name="star"
                    raised
                    type="feather"
                    color={COLOR.starYellow}
                  />
                </View>
              </View>
            </Card>
            <Card
              containerStyle={{
                borderRadius: 20,
                ...SHADOWS.large,
                maxHeight: 120,
                marginVertical: 10,
              }}
            >
              <View
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignContent: "center",
                  flexDirection: "row",
                  alignItems: "center",
                  paddingHorizontal: 10,
                }}
              >
                <Text style={{ flex: 1, fontSize: 20, marginTop: 10 }}>
                  Lavar los platos
                </Text>
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Text style={{ fontSize: 20 }}> + 80</Text>
                  <Icon
                    name="star"
                    raised
                    type="feather"
                    color={COLOR.starYellow}
                  />
                </View>
              </View>
            </Card>
            <Card
              containerStyle={{
                borderRadius: 20,
                ...SHADOWS.large,
                maxHeight: 120,
                marginVertical: 10,
              }}
            >
              <View
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignContent: "center",
                  flexDirection: "row",
                  alignItems: "center",
                  paddingHorizontal: 10,
                }}
              >
                <Text style={{ flex: 1, fontSize: 20, marginTop: 10 }}>
                  Tirar Basura
                </Text>
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Text style={{ fontSize: 20 }}> + 60</Text>
                  <Icon
                    name="star"
                    raised
                    type="feather"
                    color={COLOR.starYellow}
                  />
                </View>
              </View>
            </Card>
            <Card
              containerStyle={{
                borderRadius: 20,
                ...SHADOWS.large,
                maxHeight: 120,
                marginVertical: 10,
              }}
            >
              <View
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignContent: "center",
                  flexDirection: "row",
                  alignItems: "center",
                  paddingHorizontal: 10,
                }}
              >
                <Text style={{ flex: 1, fontSize: 20, marginTop: 10 }}>
                  Limpiar cuarto
                </Text>
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Text style={{ fontSize: 20 }}> + 50</Text>
                  <Icon
                    name="star"
                    raised
                    type="feather"
                    color={COLOR.starYellow}
                  />
                </View>
              </View>
            </Card>
            <Card
              containerStyle={{
                borderRadius: 20,
                ...SHADOWS.large,
                maxHeight: 120,
                marginVertical: 10,
              }}
            >
              <View
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignContent: "center",
                  flexDirection: "row",
                  alignItems: "center",
                  paddingHorizontal: 10,
                }}
              >
                <Text style={{ flex: 1, fontSize: 20, marginTop: 10 }}>
                  Limpiar cuarto
                </Text>
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Text style={{ fontSize: 20 }}> + 10</Text>
                  <Icon
                    name="star"
                    raised
                    type="feather"
                    color={COLOR.starYellow}
                  />
                </View>
              </View>
            </Card>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default Tasks;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
    backgroundColor: "#FFF",
  },

  footerContainer: {
    maxHeight: "30%",
    backgroundColor: "#FFEE8D",
  },

  titleRewards: {
    fontSize: 25,
    fontWeight: "600",
  },
  subTitleRewards: {
    fontSize: 18,
    marginTop: 5,
  },
});
