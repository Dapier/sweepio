import { View, Text, Button, StyleSheet, Dimensions } from "react-native";
import React, { useEffect, useState } from "react";
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
import { COLOR, SHADOWS } from "../../../constants/theme";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

export interface Todo {
  title: string;
  done: boolean;
  id: string;
}

const ValidateTasks = ({ navigation }: any) => {
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <Text style={styles.titleRewards}>Validar Tareas</Text>
        <Text style={styles.subTitleRewards}>
          Aqui podras validar y dar la recompensa a los usuarios que realizaron tus tareas.
        </Text>

        {/* Rewards */}
        <ScrollView style={{ maxHeight: "90%" }}>
          <View style={{ marginTop: 50, height: "100%" }}>
            <Card
              containerStyle={{
                borderRadius: 20,
                ...SHADOWS.large,
                marginVertical: 10,
                height: 150,
                display:'flex',
                alignItems:'center',
                padding:20
              }}
            >
             
                <Text style={{  fontSize: 20,  }}>
                  Tarea: Limpiar cuarto
                </Text>
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignContent: "center",
                    alignItems: "center",
                    justifyContent: 'space-between'
                  }}
                >
                    <Text>Usuario: Dapier</Text>
                  <Text style={{ fontSize: 20 }}> + 120</Text>
                  <Icon
                    name="star"
                    raised
                    type="feather"
                    color={COLOR.starYellow}
                  />
                </View>
                <View style={{display:'flex', flexDirection: 'row', justifyContent: 'space-around'}}>
                  <TouchableOpacity style={styles.validateTaskBtn}>
                    <Text>Completada</Text>
                    <Icon name="check" type="feather" color={"#3E1FFF"} size={40}/>
                    
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.notCompletedBtn}>
                    <Text>No completada</Text>
                    <Icon name="check" type="feather" color={"#3E1FFF"} size={40}/>
                    
                  </TouchableOpacity>
                </View>
            </Card>
            
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default ValidateTasks;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
  },
  validateTaskBtn:{
    backgroundColor: '#23F0C7',
    padding:10,
    borderRadius: 20,
    width: 120,
    display:'flex',
    flexDirection:'row',
    alignItems:'center'
  },
  notCompletedBtn:{
    backgroundColor: '#EF767A',
    padding:10,
    borderRadius: 20,
    width: 120,
    display:'flex',
    flexDirection:'row',
    alignItems:'center'
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
