import React, { useEffect, useState } from "react";
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
import { useNavigation, useRoute } from "@react-navigation/native";
import { ref, update } from "firebase/database";
import { database } from "../../firebaseConfig";

const EditTimeScreen = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedTime, setSelectedTime] = useState(new Date());

  const navigation = useNavigation();

  const route = useRoute();
  const { key, time } = route.params; // Ambil nilai waktu dari parameter rute

  useEffect(() => {
    if (time) {
      // Konversi waktu awal menjadi objek Date
      const [hours, minutes] = time.split(":");
      const initialDate = new Date();
      initialDate.setHours(Number(hours));
      initialDate.setMinutes(Number(minutes));
      setSelectedTime(initialDate);
    }
  }, [time]);

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

    // Update data waktu ke database
    const timeRef = ref(database, `times/${key}`);
    update(timeRef, { waktu: formattedTime })
      .then(() => {
        Alert.alert("Sukses", "Data waktu berhasil diubah");
        navigation.goBack(); // Ganti dengan rute yang sesuai
      })
      .catch((error) => {
        Alert.alert("Error", "Gagal mengubah data waktu");
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
        Ubah
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

export default EditTimeScreen;
