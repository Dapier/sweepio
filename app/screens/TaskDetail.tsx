import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { COLOR, SHADOWS } from "../../constants/theme";
import { Button, Card, Icon, ScreenHeight, ScreenWidth } from "@rneui/base";
import { LinearGradient } from "expo-linear-gradient";
import {
  collection,
  deleteDoc,
  doc,
  increment,
  updateDoc,
} from "firebase/firestore";
import { FIRESTORE_DB } from "../../firebaseConfig";
import { getAuth } from "firebase/auth";
import { useRoute } from "@react-navigation/native";

const TaskDetail = ({ route, navigation }: any) => {
  const { task, adminId } = route.params;

  // When user clicks into ""
  const completeTask = async () => {
    try {
      // Agregar el valor de "taskValue" al parámetro "points" del usuario actual
      const uid = getAuth().currentUser?.uid;
      const userRef = doc(FIRESTORE_DB, "users", String(uid));
      await updateDoc(userRef, {
        points: increment(task.taskValue),
      });

      // Eliminar la tarea de la subcolección "tasks" en la colección "admins"

      const adminRef = doc(FIRESTORE_DB, "admins", String(adminId));
      const taskRef = doc(adminRef, "tasks", String(task.id));
      await deleteDoc(taskRef);

      navigation.goBack(); // Back to Tasks Screen when ends function
    } catch (error) {
      console.log("Error al completar la tarea:", error);
    }
  };

  console.log("Task ID: ", task.id);
  console.log("Admin de la tarea: ", adminId);

  return (
    <View style={styles.container}>
      <View style={styles.taskDetailContainer}>
        <Text style={styles.taskTitle}>{task.title}</Text>
        <View style={styles.taskDescriptionContainer}>
          <Text style={styles.taskDescription}>{task.description}</Text>
        </View>
      </View>

      <Button
        onPress={() => completeTask()}
        title="Tomar tarea"
        iconContainerStyle={{ marginLeft: 10 }}
        titleStyle={{ fontWeight: "400", fontSize: 30 }}
        buttonStyle={{
          borderColor: "transparent",
          borderWidth: 0,
          padding: 20,
          borderRadius: 10,
        }}
        ViewComponent={LinearGradient}
        linearGradientProps={{
          colors: ["#23F0C7", "#72DDF7"],
          start: { x: 0, y: 0.5 },
          end: { x: 1, y: 0.5 },
        }}
        containerStyle={{
          width: "80%",
          marginHorizontal: 50,
          marginVertical: 10,
        }}
      />
      <View style={styles.footerContainer}>
        <Card
          containerStyle={{
            backgroundColor: "#FFEE8D",
            borderRadius: 20,
            ...SHADOWS.large,
            maxHeight: 120,
            marginHorizontal: 10,
            width: ScreenWidth * 0.6,
          }}
        >
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              marginBottom: 10,
            }}
          >
            <View style={{ position: "absolute", bottom: 30 }}>
              <Icon
                containerStyle={{
                  backgroundColor: COLOR.primary,
                  padding: 10,
                  borderRadius: 20,
                }}
                name="star"
                type="feather"
                color={COLOR.starYellow}
                size={20}
              />
            </View>
            <Text style={{ fontSize: 20, fontWeight: "600" }}>
              + {task.taskValue}
            </Text>
          </View>
        </Card>
      </View>
    </View>
  );
};

export default TaskDetail;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFF",
    height: ScreenHeight,
    display: "flex",
  },

  taskDetailContainer: {
    paddingHorizontal: 15,
    padding: 10,
    paddingTop: 40,
    flex: 1,
  },

  taskTitle: {
    fontSize: 40,
    fontWeight: "600",
  },

  taskDescriptionContainer: {
    maxHeight: "60%",
  },

  taskDescription: {
    fontSize: 20,
    fontWeight: "300",
    paddingTop: 20,
  },

  footerContainer: {
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
    height: "20%",
    bottom: 0,
    width: ScreenWidth,
  },
});
