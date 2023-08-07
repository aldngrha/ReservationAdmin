import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

function CardDashboard({ icon, text, number }) {
  const navigation = useNavigation();

  return (
    <View>
      <TouchableOpacity style={styles.cardContainer}>
        <View style={styles.leftContainer}>
          {icon}
          <Text style={styles.textLeft}>{text}</Text>
        </View>
        <View style={styles.rightContainer}>
          <Text style={styles.textRight}>{number}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

export default CardDashboard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    flexWrap: "wrap",
    // paddingTop: 10,
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
    marginBottom: 20,
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
    paddingTop: 5,
  },
  textRight: {
    color: "black",
    fontSize: 25,
    fontWeight: "bold",
  },
});
