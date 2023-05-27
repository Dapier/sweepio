import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { FlatList, ScrollView } from "react-native-gesture-handler";
import { Card, Icon } from "@rneui/base";
import { COLOR, SHADOWS } from "../../constants/theme";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { FIRESTORE_DB } from "../../firebaseConfig";
import React, { useState, useEffect } from "react";
import { getAuth } from "firebase/auth";

export interface Reward {
  cost: string;
  profit: string;
  error: boolean;
  id: string;
}

const Rewards = () => {
  const [rewards, setRewards] = useState<Reward[]>([]);
  const [adminIDGroup, setAdminIDGroup] = useState("");
  const [points, setPoints] = useState("");

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
          const rewardsAdminRef = collection(adminRef, "rewards");

          const unsubscribe = onSnapshot(rewardsAdminRef, (snapshot) => {
            const rewards: Reward[] = [];
            snapshot.docs.forEach((doc) => {
              rewards.push({
                id: doc.id,
                ...doc.data(),
              } as Reward);
            });
            setRewards(rewards);
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
      const rewards: Reward[] = [];
      snapshot.docs.forEach((doc) => {
        rewards.push({
          id: doc.id,
          ...doc.data(),
        } as Reward);
      });
      setRewards(rewards);
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

  const getPoints = async () => {
    const auth = getAuth();
    const user = auth.currentUser;
    const uid = user?.uid;

    const userDocRef = doc(collection(FIRESTORE_DB, "users"), uid);
    const userDocSnapshot = await getDoc(userDocRef);

    if (userDocSnapshot.exists()) {
      const userData = userDocSnapshot.data();
      const points = userData.points;
      console.log("Points:", points);
      setPoints(points);
      // Puedes guardar el valor de points en el estado o realizar cualquier otra acción con él
    } else {
      console.log("El documento del usuario no existe");
    }
  };

  // Llamada a la función para obtener los puntos
  getPoints();

  const renderReward = ({ item }: any) => {
    // Reference to each doc from firebase collection

    return (
      <Card
        containerStyle={{
          borderRadius: 20,
          ...SHADOWS.large,
          maxHeight: 120,
          marginVertical: 10,
          marginBottom: 10,
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
          <View>
            <Text style={{ fontSize: 30 }}> $ {item.profit}</Text>
          </View>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              alignContent: "center",
              alignItems: "center",
            }}
          >
            <Icon
              name="star"
              raised
              type="feather"
              color={COLOR.starYellow}
              reverseColor="#3E1FFF"
            />
            <Text style={{ fontSize: 20, fontWeight: 500 }}>x {item.cost}</Text>
          </View>
        </View>
      </Card>
    );
  };

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <Text style={styles.titleRewards}>Recompensas</Text>
        <Text style={styles.subTitleRewards}>
          Da click e Intercambia tus estrellas por premios!
        </Text>

        {/* Rewards */}
        <View style={{ marginTop: 20, height: "100%" }}>
          {rewards.length > 0 && (
            <FlatList
              renderItem={(reward) => renderReward(reward)}
              nestedScrollEnabled
              data={rewards}
              keyExtractor={(reward: Reward) => reward.id}
            />
          )}
        </View>
      </View>
      <View style={styles.footerContainer}>
        <View
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "space-around",
          }}
        >
          <Icon
            name="star"
            raised
            type="feather"
            color={COLOR.starYellow}
            size={20}
          />
          <Text style={{ fontSize: 20, fontWeight: "600", paddingBottom: 30 }}>
            {" "}
            Tus estrellas: {points}
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Rewards;

const styles = StyleSheet.create({
  container: {
    height: "80%",
    paddingHorizontal: 15,
    backgroundColor: "#FFF",
  },

  footerContainer: {
    height: "30%",
    backgroundColor: "#FFEE8D",
  },

  titleRewards: {
    fontSize: 25,
    fontWeight: "600",
  },
  subTitleRewards: {
    fontSize: 18,
    marginVertical: 3,
  },
});
