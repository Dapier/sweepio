import { StyleSheet, TouchableOpacity } from "react-native";
import { COLOR, SIZES } from "../../../constants";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Icon } from "@rneui/base";

const ScreenHeaderProfileBtn: React.FC<NativeStackScreenProps<any>> = ({
  navigation,
}) => {
  return (
    <TouchableOpacity
      style={styles.btnContainer}
      onPress={() => navigation.navigate("User Profile")}
    >
      <Icon name="user" type="feather" color="#72D7F6" />
    </TouchableOpacity>
  );
};

export default ScreenHeaderProfileBtn;

const styles = StyleSheet.create({
  btnContainer: {
    width: 40,
    height: 40,
    display: "flex",
    marginRight: 15,
    backgroundColor: COLOR.black,
    borderRadius: SIZES.xLarge / 1.25,
    justifyContent: "center",
    alignItems: "center",
  },
});
