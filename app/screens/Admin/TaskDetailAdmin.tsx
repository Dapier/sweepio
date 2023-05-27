import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { View, Text, StyleSheet } from "react-native";
import { Card, Icon, ScreenHeight, ScreenWidth } from "@rneui/base";
import { COLOR } from "../../../constants";
import { SHADOWS } from "../../../constants/theme";

const TaskDetailAdmin: React.FC<NativeStackScreenProps<any>> = ({
  navigation,
  route,
}) => {
  const { task }: any = route.params;

  return (
    <View style={styles.container}>
      <View style={styles.taskDetailContainer}>
        <Text style={styles.taskTitle}>{task.title}</Text>
        <View style={styles.taskDescriptionContainer}>
          <Text style={styles.taskDescription}>{task.description}</Text>
        </View>
      </View>
      <View style={styles.footerContainer}>
        <Card
          containerStyle={{
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
            <Icon
              raised
              reverseColor={COLOR.black}
              name="star"
              type="feather"
              color={COLOR.starYellow}
              size={20}
            />
            <Text style={{ fontSize: 20, fontWeight: "600" }}>
              x {task.taskValue}
            </Text>
          </View>
        </Card>
      </View>
    </View>
  );
};

export default TaskDetailAdmin;

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
