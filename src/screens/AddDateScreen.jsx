import React, { useState } from "react";
import { View, StyleSheet, Alert } from "react-native";
import {
  TextInput,
  Button,
  Portal,
  Modal,
  TouchableRipple,
} from "react-native-paper";
import DateTimePicker from "@react-native-community/datetimepicker";
import { push, ref, set } from "firebase/database";
import { database } from "../../firebaseConfig";
import { useNavigation } from "@react-navigation/native";

const AddDateScreen = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const navigation = useNavigation();

  const showDatePicker = () => {
    setShowModal(true);
  };

  const hideDatePicker = () => {
    setShowModal(false);
  };

  const handleDateChange = (event, selected) => {
    const currentDate = selected || selectedDate;
    setSelectedDate(currentDate);
    hideDatePicker();
  };

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const handleSaveDate = () => {
    const formattedDate = formatDate(selectedDate);
    // Implement save date function here
    const dateRef = push(ref(database, "dates"));

    // Simpan data ke Firebase
    set(dateRef, {
      tanggal: formattedDate,
    })
      .then(() => {
        Alert.alert("Data tanggal berhasil disimpan");
        navigation.goBack();
      })
      .catch((error) => {
        Alert.alert("Error saat menyimpan data tanggal:", error);
      });
  };

  return (
    <View style={styles.container}>
      <View style={styles.timeInputContainer}>
        <TouchableRipple onPress={showDatePicker}>
          <View pointerEvents="none">
            <TextInput
              label="Tanggal"
              value={formatDate(selectedDate)}
              editable={false}
              style={styles.timeInput}
            />
          </View>
        </TouchableRipple>
      </View>
      <Button mode="contained" onPress={handleSaveDate} buttonColor="skyblue">
        Tambah
      </Button>

      <Portal>
        <Modal visible={showModal} onDismiss={hideDatePicker}>
          <DateTimePicker
            value={selectedDate}
            mode="date"
            display="default"
            onChange={handleDateChange}
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

export default AddDateScreen;
