import { GestureResponderEvent, StyleSheet, TouchableOpacity } from "react-native";
import { COLOR, SIZES } from "../../../constants";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Icon } from "@rneui/base";
import { SHADOWS } from "../../../constants/theme";
import { StackScreenProps } from "@react-navigation/stack";
import { useNavigation } from '@react-navigation/native';
interface ScreenHeaderProfileBtnProps {
  screenName: string;

  
}

const ScreenHeaderAdminProfileBtn =  ({screenName}) => {
const navigation = useNavigation()
  return (
    <TouchableOpacity
      style={styles.btnContainer}
      onPress={()=> navigation.navigate(screenName)}
    >
      <Icon name="shield" type="feather" color="#72D7F6" />
    </TouchableOpacity>
  );
};

export default ScreenHeaderAdminProfileBtn;

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
