import React, { useEffect, useState } from "react";
import { View, StyleSheet, Alert } from "react-native";
import {
  TextInput,
  Button,
  Portal,
  Modal,
  TouchableRipple,
} from "react-native-paper";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useNavigation, useRoute } from "@react-navigation/native";
import { ref, update } from "firebase/database";
import { database } from "../../firebaseConfig";

const EditDateScreen = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const navigation = useNavigation();

  const route = useRoute();
  const { key, date } = route.params;

  useEffect(() => {
    if (date) {
      const initialDate = new Date(date);
      setSelectedDate(initialDate);
    }
  }, [date]);

  console.log(date);

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

    // Update data waktu ke database
    const timeRef = ref(database, `dates/${key}`);
    update(timeRef, { tanggal: formattedDate })
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
        Ubah
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

export default EditDateScreen;
