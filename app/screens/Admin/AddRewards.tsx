import {
  View,
  Text,
  Button,
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
import { Card, Divider, Icon } from "@rneui/base";
import { COLOR, SHADOWS } from "../../../constants/theme";
import { FIRESTORE_DB } from "../../../firebaseConfig";
import { getAuth } from "firebase/auth";
import { Input } from "@rneui/themed";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

export interface Reward {
  title: string;
  done: boolean;
  id: string;
}

const AddRewards = ({ navigation }: any) => {
  const userID = getAuth().currentUser?.uid;
  const [modalVisible, setModalVisible] = useState(false);
  const [rewards, setReward] = useState<Reward[]>([]);
  const [cost, setCost] = useState("");
  const [profit, setProfit] = useState("");

  //Reference to rewards collections for each admin
  const adminRef = doc(FIRESTORE_DB, "admins", userID);
  const rewardsRef = collection(adminRef, "rewards");

  useEffect(() => {
    const suscriber = onSnapshot(rewardsRef, {
      next: (snapshot) => {
        const rewards: Reward[] = [];
        snapshot.docs.forEach((doc) => {
          rewards.push({
            id: doc.id,
            ...doc.data(),
          } as Reward);
        });
        setReward(rewards);
      },
    });
    return () => suscriber();
  }, []);

  const addReward = async () => {
    const doc = await addDoc(rewardsRef, {
      cost: cost,
      profit: profit,
    });
    setModalVisible(!modalVisible);

    setCost(cost);
    setProfit(profit);
  };

  const renderReward = ({ item }: any) => {
    // Reference to each doc from firebase collection
    const ref = doc(FIRESTORE_DB, `tasks/${item.id}`);
    const toggleDone = async () => {
      updateDoc(ref, { done: !item.done });
    };

    const deleteItem = async () => {
      deleteDoc(ref);
    };

    return (
      <Card
        containerStyle={{
          borderRadius: 20,
          ...SHADOWS.large,
          maxHeight: 120,
          marginVertical: 10,
          marginTop: 20,
          marginBottom: 5,
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
    <SafeAreaView style={{ backgroundColor: COLOR.white }}>
      <View style={styles.container}>
        <Text style={styles.titleRewards}>Agregar Recompensas</Text>
        <Text style={styles.subTitleRewards}>
          Agrega o modifica recompensas.
        </Text>

        <TouchableOpacity
          style={styles.addTaskBtn}
          onPress={() => setModalVisible(true)}
        >
          <Text style={{ fontSize: 20 }}>Agregar nueva recompensa</Text>
          <Icon
            name="check-circle"
            type="feather"
            color={"#3E1FFF"}
            size={40}
          />
        </TouchableOpacity>

        <Modal
          animationType="fade"
          transparent={true}
          statusBarTranslucent
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <View>
                <Text style={styles.modalText}>Nueva Recompensa</Text>
                <Input
                  placeholder="Ganancia"
                  onChangeText={(text: string) => setProfit(text)}
                  value={profit}
                  keyboardType="numeric"
                  rightIcon={
                    <Icon
                      name="star"
                      type="feather"
                      color={COLOR.starYellow}
                      reverseColor="#3E1FFF"
                    />
                  }
                />
                <Input
                  keyboardType="numeric"
                  placeholder="Costo"
                  onChangeText={(text: string) => setCost(text)}
                  value={cost}
                  rightIcon={
                    <Icon
                      name="dollar-sign"
                      type="feather"
                      color={COLOR.black}
                      reverseColor="#3E1FFF"
                    />
                  }
                />
              </View>

              <View
                style={{
                  display: "flex",
                }}
              >
                <TouchableOpacity
                  onPress={addReward}
                  disabled={!cost || !profit}
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
                  <Text style={{ color: "#fff" }}> Agregar recompensa</Text>
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

        {/* Rewards */}
        {rewards.length > 0 && (
          <View style={{ height: "65%", backgroundColor: COLOR.white }}>
            <FlatList
              style={{ backgroundColor: COLOR.white }}
              renderItem={(reward) => renderReward(reward)}
              nestedScrollEnabled
              data={rewards}
              keyExtractor={(reward: Reward) => reward.id}
            />
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

export default AddRewards;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
    backgroundColor: COLOR.white,
    height: screenHeight,
  },
  addTaskBtn: {
    borderRadius: 20,
    backgroundColor: "#FDAD0F",
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
  },
  modalView: {
    width: "80%",
    height: screenHeight / 1.7,
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
});
