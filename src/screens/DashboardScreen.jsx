import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import MaterialCommunityIcon from "@expo/vector-icons/MaterialCommunityIcons";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { useNavigation } from "@react-navigation/native";
import CardDashboard from "../components/CardDashboard";

function DashboardScreen() {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <View style={styles.welcomeContainer}>
          <Text style={styles.welcome}>Selamat Datang, Nana!</Text>
        </View>
        <CardDashboard
          icon={<FontAwesome5 name="user-check" size={35} color="black" />}
          text="Customer"
          number={100}
        />
        <CardDashboard
          icon={<MaterialCommunityIcon name="book" size={40} color="black" />}
          text="Reservasi"
          number={50}
        />
        <CardDashboard
          icon={<FontAwesome5 name="dollar-sign" size={40} color="black" />}
          text="Transaksi"
          number={25}
        />
      </View>
    </SafeAreaView>
  );
}

export default DashboardScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fafafa",
    flexWrap: "wrap",
    // paddingTop: 10,
  },
  welcomeContainer: {
    alignSelf: "flex-end",
    marginBottom: 20,
    marginTop: -20,
  },
  cardContainer: {
    backgroundColor: "white",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    width: 385,
    height: 120,
    marginLeft: 15,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: "#fafafa",
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 10,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    elevation: 5, // (for Android)
  },
  leftContainer: {
    flexDirection: "column",
    alignItems: "center",
    marginHorizontal: 20,
  },
  rightContainer: {
    alignItems: "flex-end",
    marginHorizontal: 20,
  },
  textLeft: {
    color: "gray",
    fontSize: 20,
    fontWeight: "100",
  },
  textRight: {
    color: "black",
    fontSize: 25,
    fontWeight: "bold",
  },
  welcome: {
    color: "gray",
    fontSize: 25,
    fontWeight: "bold",
  },
});
