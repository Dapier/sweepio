import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Modal,
  Pressable,
} from "react-native";
import React, { useEffect, useState } from "react";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";
import { KeyboardAvoidingView } from "react-native";
import { FlatList } from "react-native";
import { TouchableOpacity } from "react-native";
import { Card, Icon, ScreenWidth } from "@rneui/base";
import { COLOR, SHADOWS, SIZES } from "../../../constants/theme";
import { FIRESTORE_DB } from "../../../firebaseConfig";
import { Input } from "@rneui/themed";
import { useAutentication } from "../../../utils/useAuthentication";
import { getAuth } from "firebase/auth";

const screenHeight = Dimensions.get("window").height;

export interface Task {
  title: string;
  description: string;
  taskValue: number;
  done: boolean;
  id: string;
  error: boolean;
}

const AddTasks = ({ navigation }: any) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [taskValue, setTaskValue] = useState("0");
  const userID = getAuth().currentUser?.uid;

  //Parent admin reference
  const adminRef = doc(FIRESTORE_DB, "admins", userID);
  const taskAdminRef = collection(adminRef, "tasks");

  useEffect(() => {
    //Getting updates in tasks
    const suscriber = onSnapshot(taskAdminRef, {
      next: (snapshot) => {
        const tasks: Task[] = [];
        snapshot.docs.forEach((doc) => {
          tasks.push({
            id: doc.id,
            ...doc.data(),
          } as Task);
        });
        setTasks(tasks);
      },
    });

    return () => suscriber();
  }, []);

  // Redirect to TaskDetail Screen
  const goToTaskDetails = (task: Task) => {
    navigation.navigate("Admin Task Details", { task });
  };

  //Add tasks
  const addTask = async () => {
    const doc = await addDoc(taskAdminRef, {
      title: taskTitle,
      description: taskDescription,
      taskValue: taskValue,
    });
    setModalVisible(!modalVisible);
    setTaskTitle("");
    setTaskDescription("");
    setTaskValue("");
  };

  // Render all tasks in database
  const renderTodo = ({ item }: { item: Task }) => {
    return (
      <TouchableOpacity
        style={styles.taskCard}
        onPress={() => goToTaskDetails(item)}
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
            {item.title}
          </Text>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              alignContent: "center",
              alignItems: "center",
            }}
          >
            <Text style={{ fontSize: 20, marginRight: 10 }}>
              {" "}
              + {item.taskValue}
            </Text>
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
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <KeyboardAvoidingView behavior="padding">
      <View style={styles.container}>
        <Text style={styles.titleRewards}>Agregar Tareas</Text>
        <Text style={styles.subTitleRewards}>Agrega o modifica tareas.</Text>

        <TouchableOpacity
          onPress={() => setModalVisible(true)}
          style={styles.addTaskBtn}
        >
          <Text style={{ fontSize: 20 }}>Agregar tarea nueva</Text>
          <Icon name="plus" type="feather" color={"#000"} size={40} />
        </TouchableOpacity>

        <Modal
          animationType="fade"
          transparent
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <View>
                <Text style={styles.modalText}>Nueva tarea</Text>
                <Input
                  placeholder="Titulo de la tarea"
                  onChangeText={(text: string) => setTaskTitle(text)}
                  value={taskTitle}
                />
                <Input
                  placeholder="Descripcion de la tarea"
                  onChangeText={(text: string) => setTaskDescription(text)}
                  value={taskDescription}
                  style={styles.descriptionInput}
                  numberOfLines={4}
                  multiline
                />
                <Input
                  keyboardType="numeric"
                  placeholder="Valor de la tarea"
                  onChangeText={(text: string) => setTaskValue(text)}
                  value={taskValue}
                  rightIcon={<Icon name="star" type="feather" color="#000" />}
                />
              </View>

              <View
                style={{
                  display: "flex",
                }}
              >
                <TouchableOpacity
                  onPress={addTask}
                  disabled={!taskTitle || !taskDescription || !taskValue}
                  style={{
                    height: 50,
                    backgroundColor: "#3E1FFF",
                    alignItems: "center",
                    justifyContent: "center",
                    borderColor: "transparent",
                    borderWidth: 1,
                    borderRadius: 20,
                    marginBottom: 10,
                  }}
                >
                  <Text style={{ color: "#fff" }}> Agregar tarea</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => setModalVisible(!modalVisible)}
                  style={{
                    height: 50,
                    backgroundColor: COLOR.redDanger,
                    alignItems: "center",
                    justifyContent: "center",
                    borderColor: "transparent",
                    borderWidth: 1,
                    borderRadius: 20,
                  }}
                >
                  <Text style={{ color: "#fff" }}> Cerrar</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>

        {tasks.length > 0 && (
          <View style={{ marginTop: 20, height: "65%" }}>
            <FlatList
              nestedScrollEnabled
              data={tasks}
              renderItem={(item) => renderTodo(item)}
              keyExtractor={(tasks: Task) => tasks.id}
            />
          </View>
        )}
      </View>
    </KeyboardAvoidingView>
  );
};

export default AddTasks;

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLOR.white,
    paddingHorizontal: 15,
    height: screenHeight,
  },
  addTaskBtn: {
    borderRadius: 20,
    backgroundColor: "#FFE347",
    maxHeight: 120,
    height: 80,
    display: "flex",
    justifyContent: "space-evenly",
    alignItems: "center",
    flexDirection: "row",
    ...SHADOWS.large,
    marginTop: 20,
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

  //   Modal
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
    height: screenHeight,
    maxHeight: screenHeight,
    width: "100%",
    backgroundColor: "rgba(255, 255, 255, 0.9)",
  },
  modalView: {
    width: "90%",
    height: screenHeight / 1.2,
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    justifyContent: "space-between",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },

  descriptionInput: {
    padding: 10,
    fontSize: 16,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "left",
    fontSize: 25,
    fontWeight: 600,
  },

  taskCard: {
    width: ScreenWidth / 1.12,
    height: 100,
    display: "flex",
    marginTop: 15,
    marginRight: 15,
    backgroundColor: COLOR.white,
    borderRadius: SIZES.xLarge / 1.25,
    justifyContent: "center",
    alignItems: "center",
    ...SHADOWS.large,
    textAlign: "center",
    paddingLeft: 10,
    marginLeft: 2,
    marginBottom: 5,
  },
});
