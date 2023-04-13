import * as Font from "expo-font";

export default useFont = async () => {
  await Font.loadAsync({
    NunitoBold: require("../assets/fonts/Nunito-Bold.ttf"),
    NunitoMedium: require("../assets/fonts/Nunito-Medium.ttf"),
    NunitoRegular: require("../assets/fonts/Nunito-Regular.ttf"),
    OpSansBold: require("../assets/fonts/OpenSans-Bold.ttf"),
    OpSansLight: require("../assets/fonts/OpenSans-Light.ttf"),
    OpSansMedium: require("../assets/fonts/OpenSans-Medium.ttf"),
  });
};
