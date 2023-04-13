import { View, Text, Image } from "react-native";
import styles from "./welcome.style";
import { images } from "../../../../constants";

const Welcome = ({}) => {
  return (
    <View>
      <View style={styles.container}>
        <Image source={images.star} resizeMode="contain" />
        <Text style={styles.welcomeText}>
          Completa tareas simples para conseguir estrellas y recibir premios!
        </Text>
      </View>
    </View>
  );
};

export default Welcome;
