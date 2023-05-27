import { View, Text, Button, StyleSheet, Dimensions } from "react-native";
import React, { useEffect, useState } from "react";
import { TouchableOpacity } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { SafeAreaView } from "react-native-safe-area-context";
import { getAuth, signOut } from "firebase/auth";
import { Input } from "@rneui/base";
import { COLOR } from "../../../constants";
import { SHADOWS, SIZES } from "../../../constants/theme";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  query,
} from "firebase/firestore";
import { FIRESTORE_DB } from "../../../firebaseConfig";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

export interface Task {
  title: string;
  done: boolean;
  id: string;
}

const auth = getAuth();

const AdminAccount: React.FC<NativeStackScreenProps<any>> = ({
  navigation,
}: any) => {
  auth.currentUser?.email;
  const userID = getAuth().currentUser?.uid;
  const [adminData, setAdminData] = useState({});

  const [tasks, setTasks] = useState<Task[]>([]);

  const adminRef = doc(FIRESTORE_DB, "admins", String(userID));
  const taskAdminRef = collection(adminRef, "tasks");

  useEffect(() => {
    // Getting admin user name
    async function loadData() {
      const adminDataRef = doc(FIRESTORE_DB, "admins", String(userID));
      const adminDocSnap = await getDoc(adminDataRef);
      const data = adminDocSnap.data();
      try {
        setAdminData(data);
      } catch (e) {
        console.log("Error: ", e);
      }
    }

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

    loadData();

    return () => suscriber();
  }, []);

  async function handleSignOut() {
    try {
      await signOut(auth);
      //push to Home screen
    } catch (error) {}
  }

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <View
          style={{
            display: "flex",
            flexDirection: "column",
            maxHeight: "100%",
            height: screenHeight / 1.2,
            justifyContent: "space-around",
          }}
        >
          <View>
            <Text style={styles.titleUserAccount}>Cuenta Administrador</Text>
            <View style={{ width: "80%", marginVertical: 30 }}>
              <Text style={{ fontSize: 20 }}>Usuario</Text>
              <Input disabled defaultValue={adminData.userName || undefined} />
              <Text style={{ fontSize: 20 }}>Correo</Text>
              <Input
                disabled
                defaultValue={auth.currentUser?.email || undefined}
              />

              <Text style={{ fontSize: 20 }}>Tareas creadas</Text>
              <Input disabled value={String(tasks.length)} />
            </View>
          </View>

          <View>
            <TouchableOpacity
              style={styles.btnContainer}
              onPress={handleSignOut}
            >
              <Text style={{ color: COLOR.white }}>Cerrar sesión</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default AdminAccount;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
    backgroundColor: "#FFF",
  },
  titleUserAccount: {
    fontSize: 25,
    fontWeight: "600",
    marginVertical: 20,
  },

  btnContainer: {
    width: "100%",
    height: 50,
    display: "flex",
    marginTop: 205,
    marginRight: 15,
    backgroundColor: "#EF767A",
    borderRadius: SIZES.xLarge / 1.25,
    justifyContent: "center",
    alignItems: "center",
    ...SHADOWS.large,
  },
});
