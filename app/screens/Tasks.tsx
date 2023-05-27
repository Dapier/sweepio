import { View, Text, Button, StyleSheet, Dimensions } from "react-native";
import React, { useEffect, useState } from "react";
import { FIRESTORE_DB } from "../../firebaseConfig";
import {
  addDoc,
  collection,
  collectionGroup,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  increment,
  onSnapshot,
  query,
  snapshotEqual,
  updateDoc,
  where,
} from "firebase/firestore";
import { TextInput } from "react-native";
import { KeyboardAvoidingView } from "react-native";
import { FlatList } from "react-native";
import { TouchableOpacity } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Entypo } from "@expo/vector-icons";
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { Card, Icon, ScreenWidth } from "@rneui/base";
import { COLOR, SHADOWS, SIZES } from "../../constants/theme";
import { async } from "@firebase/util";
import { getAuth } from "firebase/auth";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

export interface Task {
  title: string;
  description: string;
  taskValue: number;
  done: boolean;
  id: string;
  error: boolean;
}

export interface Todo {
  title: string;
  done: boolean;
  id: string;
}

export interface Admin {
  id: string;
  email: string;
  groupCode: string;
  userName: string;
}

const Tasks = ({ navigation }: any) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [adminIDGroup, setAdminIDGroup] = useState("");
  const uid = getAuth().currentUser?.uid;
  const [userPoints, setUserPoints] = useState(0);

  //Get current user points
  const getUserPoints = async (uid: string) => {
    const userRef = doc(FIRESTORE_DB, "users", String(uid));
    const userSnapshot = await getDoc(userRef);

    if (userSnapshot.exists()) {
      const userData = userSnapshot.data();
      const points = userData?.points || 0; // Si no se encuentra el campo "points", se asigna 0
      return points;
    } else {
      console.log(`El usuario con UID ${uid} no existe`);
      return 0;
    }
  };

  const getUserGroup = async (
    collectionName: string,
    documentId: string,
    parameterName: string
  ) => {
    const documentRef = doc(
      collection(FIRESTORE_DB, collectionName),
      documentId
    );
    const documentSnapshot = await getDoc(documentRef);

    if (documentSnapshot.exists()) {
      const data = documentSnapshot.data();
      const parameterValue = data?.[parameterName];
      console.log("==================================");

      console.log(`Valor del parámetro ${parameterName}: ${parameterValue}`);
      return parameterValue;
    } else {
      console.log(
        `El documento ${documentId} no existe en la colección ${collectionName}`
      );
      return null;
    }
  };

  const findAdminsWithGroupCode = async (groupCode: string) => {
    const usuariosCollectionRef = collection(FIRESTORE_DB, "users");
    const usuariosQuery = query(
      usuariosCollectionRef,
      where("groupCode", "==", groupCode)
    );
    const usuariosSnapshot = await getDocs(usuariosQuery);
    const adminsCollectionRef = collection(FIRESTORE_DB, "admins");
    const adminsQuery = query(
      adminsCollectionRef,
      where("groupCode", "==", groupCode)
    );
    const adminsSnapshot = await getDocs(adminsQuery);

    usuariosSnapshot.forEach((usuarioDoc) => {
      console.log(`Usuarios con groupCode "${groupCode}": ${usuarioDoc.id}`);

      if (!adminsSnapshot.empty) {
        adminsSnapshot.forEach((adminDoc) => {
          console.log(`Admins con groupCode "${groupCode}": ${adminDoc.id}`);
          setAdminIDGroup(adminDoc.id);

          const adminRef = doc(FIRESTORE_DB, "admins", adminDoc.id);
          const taskAdminRef = collection(adminRef, "tasks");

          const unsubscribe = onSnapshot(taskAdminRef, (snapshot) => {
            const tasks: Task[] = [];
            snapshot.docs.forEach((doc) => {
              tasks.push({
                id: doc.id,
                ...doc.data(),
              } as Task);
            });
            setTasks(tasks);
          });

          return unsubscribe; // Salir del forEach una vez que se encuentre un admin con el groupCode
        });
      } else {
        console.log(`No se encontraron admins con groupCode "${groupCode}"`);
      }
    });
  };

  const fetchData = async () => {
    const auth = getAuth();
    const user = auth.currentUser;
    const uid = user?.uid;
    const userGroup = await getUserGroup("users", String(uid), "groupCode");
    console.log("El grupo del usuario es: ", userGroup);

    const userPoints = await getUserPoints(String(uid));
    setUserPoints(userPoints);

    await findAdminsWithGroupCode(userGroup);

    console.log("El usuario pertenece al grupo: ", userGroup);
    console.log(
      "El administrador con el id: ",
      adminIDGroup,
      "es el jefe del grupo del usuario"
    );

    const adminRef = doc(FIRESTORE_DB, "admins", adminIDGroup);
    const taskAdminRef = collection(adminRef, "tasks");

    const unsubscribe = onSnapshot(taskAdminRef, (snapshot) => {
      const tasks: Task[] = [];
      snapshot.docs.forEach((doc) => {
        tasks.push({
          id: doc.id,
          ...doc.data(),
        } as Task);
      });
      setTasks(tasks);
    });

    return unsubscribe;
  };

  useEffect(() => {
    let unsubscribe: () => void;

    fetchData()
      .then((unsub) => {
        unsubscribe = unsub;
      })
      .catch((error) => {
        console.log("Error al obtener los datos:", error);
      });

    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, []);

  const goToTaskDetails = (task: Task, adminId: string) => {
    navigation.navigate("Task Detail Screen", { task, adminId });
  };

  const renderTodo = ({ item }: { item: Task }) => {
    return (
      <TouchableOpacity
        style={styles.taskCard}
        onPress={() => goToTaskDetails(item, adminIDGroup)}
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
    <SafeAreaView style={{ height: screenHeight }}>
      <View style={styles.container}>
        <View
          style={{
            paddingHorizontal: 15,
            height: "75%",
            marginBottom: 20,
          }}
        >
          <Text style={styles.titleRewards}>Tareas Pendientes</Text>
          <Text style={styles.subTitleRewards}>
            Consigue premios cumpliendo tareas!
          </Text>

          {/* Rewards */}

          {tasks.length > 0 && (
            <View>
              <FlatList
                nestedScrollEnabled
                scrollEnabled
                data={tasks}
                renderItem={(item) => renderTodo(item)}
                keyExtractor={(tasks: Task) => tasks.id}
              />
            </View>
          )}
        </View>

        <View style={styles.footerContainer}>
          <Card
            containerStyle={{
              borderRadius: 20,
              ...SHADOWS.large,
              maxHeight: 170,
              marginHorizontal: 10,
              width: ScreenWidth * 0.9,
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
              <Icon
                containerStyle={{
                  backgroundColor: COLOR.primary,
                  padding: 10,
                  borderRadius: 20,
                  marginRight: 10,
                }}
                name="star"
                type="feather"
                color={COLOR.starYellow}
                size={20}
              />
              <Text style={{ fontSize: 20, fontWeight: "600" }}>
                x {userPoints}
              </Text>
            </View>
          </Card>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Tasks;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFF",
    height: screenHeight,
  },

  taskCard: {
    width: screenWidth / 1.12,
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
  },

  footerContainer: {
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
    height: "20%",
    bottom: 20,
    width: ScreenWidth,
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
