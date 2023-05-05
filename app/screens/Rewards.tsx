import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, StyleSheet } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Card, Icon } from "@rneui/base";
import { COLOR, SHADOWS } from "../../constants/theme";
const Rewards = () => {
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <Text style={styles.titleRewards}>Recompensas</Text>
        <Text style={styles.subTitleRewards}>
          Da click e Intercambia tus estrellas por premios!
        </Text>

        {/* Rewards */}
        <ScrollView style={{ maxHeight: "80%" }}>
          <View style={{ marginTop: 20, height: "90%" }}>
            <Card
              containerStyle={{
                borderRadius: 20,
                ...SHADOWS.large,
                maxHeight: 100,
                marginVertical: 10,
              }}
            >
              <View
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignContent: "center",
                  flexDirection: "row",
                  alignItems: "center",
                  height: 50,
                  paddingHorizontal: 10,
                }}
              >
                <Text style={{ flex: 1, fontSize: 30 }}>$ 200</Text>
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
                  />
                  <Text style={{ fontSize: 20 }}> x 320</Text>
                </View>
              </View>
            </Card>
            <Card
              containerStyle={{
                borderRadius: 20,
                ...SHADOWS.large,
                maxHeight: 100,
                marginVertical: 10,
              }}
            >
              <View
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignContent: "center",
                  flexDirection: "row",
                  alignItems: "center",
                  height: 50,
                  paddingHorizontal: 10,
                }}
              >
                <Text style={{ flex: 1, fontSize: 30 }}>$ 160</Text>
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
                  />
                  <Text style={{ fontSize: 20 }}> x 200</Text>
                </View>
              </View>
            </Card>
            <Card
              containerStyle={{
                borderRadius: 20,
                ...SHADOWS.large,
                maxHeight: 100,
                marginVertical: 10,
              }}
            >
              <View
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignContent: "center",
                  flexDirection: "row",
                  alignItems: "center",
                  height: 50,
                  paddingHorizontal: 10,
                }}
              >
                <Text style={{ flex: 1, fontSize: 30 }}>$ 150</Text>
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
                  />
                  <Text style={{ fontSize: 20 }}> x 190</Text>
                </View>
              </View>
            </Card>
            <Card
              containerStyle={{
                borderRadius: 20,
                ...SHADOWS.large,
                maxHeight: 100,
                marginVertical: 10,
              }}
            >
              <View
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignContent: "center",
                  flexDirection: "row",
                  alignItems: "center",
                  height: 50,
                  paddingHorizontal: 10,
                }}
              >
                <Text style={{ flex: 1, fontSize: 30 }}>$ 200</Text>
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
                  />
                  <Text style={{ fontSize: 20 }}> x 320</Text>
                </View>
              </View>
            </Card>
            <Card
              containerStyle={{
                borderRadius: 20,
                ...SHADOWS.large,
                maxHeight: 100,
                marginVertical: 10,
              }}
            >
              <View
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignContent: "center",
                  flexDirection: "row",
                  alignItems: "center",
                  height: 50,
                  paddingHorizontal: 10,
                }}
              >
                <Text style={{ flex: 1, fontSize: 30 }}>$ 200</Text>
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
                  />
                  <Text style={{ fontSize: 20 }}> x 320</Text>
                </View>
              </View>
            </Card>
            <Card
              containerStyle={{
                borderRadius: 20,
                ...SHADOWS.large,
                maxHeight: 100,
                marginVertical: 10,
              }}
            >
              <View
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignContent: "center",
                  flexDirection: "row",
                  alignItems: "center",
                  height: 50,
                  paddingHorizontal: 10,
                }}
              >
                <Text style={{ flex: 1, fontSize: 30 }}>$ 200</Text>
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
                  />
                  <Text style={{ fontSize: 20 }}> x 320</Text>
                </View>
              </View>
            </Card>
            <Card
              containerStyle={{
                borderRadius: 20,
                ...SHADOWS.large,
                maxHeight: 100,
                marginVertical: 10,
              }}
            >
              <View
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignContent: "center",
                  flexDirection: "row",
                  alignItems: "center",
                  height: 50,
                  paddingHorizontal: 10,
                }}
              >
                <Text style={{ flex: 1, fontSize: 30 }}>$ 200</Text>
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
                  />
                  <Text style={{ fontSize: 20 }}> x 320</Text>
                </View>
              </View>
            </Card>
            <Card
              containerStyle={{
                borderRadius: 20,
                ...SHADOWS.large,
                maxHeight: 100,
                marginVertical: 10,
              }}
            >
              <View
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignContent: "center",
                  flexDirection: "row",
                  alignItems: "center",
                  height: 50,
                  paddingHorizontal: 10,
                }}
              >
                <Text style={{ flex: 1, fontSize: 30 }}>$ 200</Text>
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
                  />
                  <Text style={{ fontSize: 20 }}> x 320</Text>
                </View>
              </View>
            </Card>
          </View>
        </ScrollView>
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
          <Text style={{ fontSize: 20, fontWeight: "600" }}>
            {" "}
            Tus estrellas: 120
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Rewards;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
    backgroundColor: "#FFF",
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
    marginVertical: 3,
  },
});
