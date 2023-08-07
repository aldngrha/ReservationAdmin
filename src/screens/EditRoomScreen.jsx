import React, { useState } from "react";
import { View, StyleSheet, TextInput, Text } from "react-native";
import { Button } from "react-native-paper";

const EditRoomScreen = () => {
  const [room, setRoom] = useState("");

  const handleSaveDate = () => {
    // Implement save date function here
    console.log("Tempat:", room);
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

export default EditRoomScreen;
