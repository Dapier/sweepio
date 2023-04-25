import { View, Text } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLOR, FONT } from "../../../constants"
import { createStackNavigator } from "@react-navigation/stack";
import { ScrollView } from "react-native-gesture-handler";
import { Button, Chip } from "@rneui/themed";
import { LinearGradient } from "expo-linear-gradient";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import {
  VirtualizedList,
  StyleSheet,
  StatusBar,
} from 'react-native';

type ItemData = {
    id: string;
    title: string;
  };
const getItem = (_data: unknown, index: number): ItemData => ({
    id: Math.random().toString(12).substring(0),
    title: `Nombre de tarea #${index + 1}`,
  });
const getItemCount = (_data: unknown) => 50;
type ItemProps = {
    title: string;
  };
  const Item = ({title}: ItemProps) => (
        <View style={styles.item}>
          <Text style={styles.title}>{title}</Text>
          <View style={{ flexDirection:"row" }}>
          <Button
            title="Cumplió"
            icon={{
              name: "checkmark-circle-outline",
              type: "ionicon",
              size: 20,
              color: "black",
            }}
            iconRight
            iconContainerStyle={{ marginLeft: 5 }}
            titleStyle={{ fontWeight: "400", fontSize: 20, color:"black" }}
            buttonStyle={{
              borderColor: "transparent",
              borderWidth: 0,
              padding: 5,
              borderRadius: 50,
            }}
            ViewComponent={LinearGradient}
            linearGradientProps={{
              colors: ["#FFE347", "#FFE347"],
              start: { x: 0, y: 0.5 },
              end: { x: 1, y: 0.5 },
            }}
            containerStyle={{
              width: "45%",
              marginHorizontal: 10,
              marginVertical: 10,
            }} 
          />
          <Button
            title="No Cumplió"
            icon={{
              name: "close-circle-outline",
              type: "ionicon",
              size: 20,
              color: "black",
            }}
            iconRight
            iconContainerStyle={{ marginLeft: 5 }}
            titleStyle={{ fontWeight: "400", fontSize: 20, color:"black" }}
            buttonStyle={{
              borderColor: "transparent",
              borderWidth: 0,
              padding: 5,
              borderRadius: 50,
            }}
            ViewComponent={LinearGradient}
            linearGradientProps={{
              colors: ["#E97175", "#E97175"],
              start: { x: 0, y: 0.5 },
              end: { x: 1, y: 0.5 },
            }}
            containerStyle={{
              width: "45%",
              marginHorizontal: 10,
              marginVertical: 10,
            }} 
          />
          </View>
        </View>
  );
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginTop: StatusBar.currentHeight,
    },
    item: {
      backgroundColor: '#f9c2ff',
      height: 150,
      justifyContent: 'center',
      marginVertical: 8,
      marginHorizontal: 16,
      padding: 20,
      borderColor: "transparent",
      borderWidth: 0,
      borderRadius: 25,
    },
    title: {
      fontSize: 32,
    },
  });

const Stack = createStackNavigator();
const Home: React.FC<NativeStackScreenProps<any>> = ({ navigation }) => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLOR.lightBlue }}>
      <Text
            style={{
              marginTop: 80,
              marginLeft:10,
              fontSize: 50,
              fontWeight: "bold",
              textAlign: "left",
              color: COLOR.black,
              fontFamily: FONT.boldNun,
            }}
          >
          Tareas Tomadas
      </Text>
      <Text
            style={{
              marginTop: 20,
              marginLeft:10,
              marginRight:10,
              fontSize: 25,
              fontWeight: "normal",
              textAlign: "left",
              color: COLOR.black,
              fontFamily: FONT.lightOpS,
            }}
          >
          Valida si efectivamente la tarea se cumplió para otorgar la recompensa asignada
      </Text>
      <View
        style={{
          display: "flex",
          justifyContent: "space-evenly",
          height: "80%",
        }}
      >     
        <VirtualizedList
            initialNumToRender={4}
            renderItem={({item}) => <Item title={item.title} />}
            keyExtractor={item => item.id}
            getItemCount={getItemCount}
            getItem={getItem}
        />
      </View>
    </SafeAreaView>
  );
};

export default Home;
