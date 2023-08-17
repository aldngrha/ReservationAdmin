import { useNavigation } from "@react-navigation/native";
import { push, ref, set } from "firebase/database";
import React, { useState } from "react";
import { View, StyleSheet, TextInput, Text, Alert } from "react-native";
import { Button } from "react-native-paper";
import { database } from "../../firebaseConfig";

const AddRoomScreen = () => {
  const [room, setRoom] = useState("");
  const navigation = useNavigation();

  const handleSaveDate = () => {
    // Implement save date function hereconst dateRef = push(ref(database, "dates"));

    const roomRef = push(ref(database, "rooms"));
    // Simpan data ke Firebase
    set(roomRef, {
      tempat: room,
    })
      .then(() => {
        Alert.alert("Data tempat berhasil disimpan");
        navigation.goBack();
      })
      .catch((error) => {
        Alert.alert("Error saat menyimpan data tempat:", error);
      });
  };

  return (
    <View style={styles.container}>
      <View style={styles.timeInputContainer}>
        <View>
          <Text>Masukkan Tempat</Text>
          <TextInput
            placeholder="Masukkan tempat"
            value={room}
            onChangeText={(text) => setRoom(text)}
            style={styles.timeInput}
          />
        </View>
      </View>
      <Button mode="contained" onPress={handleSaveDate} buttonColor="skyblue">
        Tambah
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#fff",
  },
  timeInputContainer: {
    marginBottom: 20,
  },
  timeInput: {
    backgroundColor: "white",
    padding: 10,
    marginTop: 10,
    borderRadius: 7,
    borderWidth: 1,
  },
});

export default AddRoomScreen;
