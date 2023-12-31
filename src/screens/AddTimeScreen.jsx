import React, { useState } from "react";
import { View, StyleSheet, Alert } from "react-native";
import {
  TextInput,
  Button,
  Portal,
  Modal,
  Text,
  TouchableRipple,
} from "react-native-paper";
import DateTimePicker from "@react-native-community/datetimepicker";
import { database } from "../../firebaseConfig";
import { ref, push, set } from "firebase/database";
import { useNavigation } from "@react-navigation/native";

const AddTimeScreen = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedTime, setSelectedTime] = useState(new Date());

  const navigation = useNavigation();

  const showTimePicker = () => {
    setShowModal(true);
  };

  const hideTimePicker = () => {
    setShowModal(false);
  };

  const handleTimeChange = (event, selected) => {
    const currentTime = selected || selectedTime;
    setSelectedTime(currentTime);
    hideTimePicker();
  };

  const formatTime = (time) => {
    const hours = time.getHours().toString().padStart(2, "0");
    const minutes = time.getMinutes().toString().padStart(2, "0");
    return `${hours}:${minutes}`;
  };

  const handleSaveTime = () => {
    const formattedTime = formatTime(selectedTime);

    const reservationRef = push(ref(database, "times"));

    // Simpan data ke Firebase
    set(reservationRef, {
      waktu: formattedTime,
    })
      .then(() => {
        Alert.alert("Data waktu berhasil disimpan");
        navigation.goBack();
      })
      .catch((error) => {
        Alert.alert("Error saat menyimpan data waktu:", error);
      });
  };

  return (
    <View style={styles.container}>
      <View style={styles.timeInputContainer}>
        <TouchableRipple onPress={showTimePicker}>
          <View pointerEvents="none">
            <TextInput
              label="Waktu"
              value={formatTime(selectedTime)}
              editable={false}
              style={styles.timeInput}
            />
          </View>
        </TouchableRipple>
      </View>
      <Button mode="contained" onPress={handleSaveTime} buttonColor="skyblue">
        Tambah
      </Button>

      <Portal>
        <Modal visible={showModal} onDismiss={hideTimePicker}>
          <DateTimePicker
            value={selectedTime}
            mode="time"
            is24Hour={true}
            display="spinner"
            onChange={handleTimeChange}
          />
        </Modal>
      </Portal>
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
    backgroundColor: "transparent",
  },
});

export default AddTimeScreen;
