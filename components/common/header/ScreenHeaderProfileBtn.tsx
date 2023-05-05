import { StyleSheet, TouchableOpacity } from "react-native";
import { COLOR, SIZES } from "../../../constants";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Icon } from "@rneui/base";
import { SHADOWS } from "../../../constants/theme";
import { StackScreenProps } from "@react-navigation/stack";

// interface ScreenHeaderProfileBtnProps {
//   navigation: React.ReactNode;
//   screenName: string;
//   props: ...props;
// }

const ScreenHeaderProfileBtn: React.FC<NativeStackScreenProps<any>> = ({
  navigation,
}) => {
  return (
    <TouchableOpacity
      style={styles.btnContainer}
      onPress={() => navigation.navigate("User Account Screen")}
    >
      <Icon name="user" type="feather" color="#72D7F6" />
    </TouchableOpacity>
  );
};

export default ScreenHeaderProfileBtn;

const styles = StyleSheet.create({
  btnContainer: {
    width: 50,
    height: 50,
    display: "flex",
    marginTop: 15,
    marginRight: 15,
    backgroundColor: COLOR.white,
    borderRadius: SIZES.xLarge / 1.25,
    justifyContent: "center",
    alignItems: "center",
    ...SHADOWS.large,
  },
});
