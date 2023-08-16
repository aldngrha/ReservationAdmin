import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  Button,
  Modal,
  TouchableOpacity,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";

const StatusServicelineScreen = () => {
  const [timelineData, setTimelineData] = useState([
    {
      time: "09:10",
      title: "Reservasi diterima",
      description: "Reservasi telah diterima oleh sistem.",
    },
  ]);

  const [modalVisible, setModalVisible] = useState(false);
  const [eventTime, setEventTime] = useState("");
  const [eventTitle, setEventTitle] = useState("");
  const [eventDescription, setEventDescription] = useState("");

  const addTimelineEvent = () => {
    const newEvent = {
      time: eventTime,
      title: eventTitle,
      description: eventDescription,
    };

    setTimelineData([...timelineData, newEvent]);
    setModalVisible(false);
    setEventTime("");
    setEventTitle("");
    setEventDescription("");
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Status Timeline</Text>
      {timelineData.map((event, index) => (
        <View key={index} style={styles.timelineEvent}>
          <View style={styles.timelineIcon}>
            <AntDesign name="check" size={20} color="white" />
          </View>
          <View style={styles.timelineContent}>
            <Text style={styles.eventTime}>{event.time}</Text>
            <Text style={styles.eventTitle}>{event.title}</Text>
            <Text style={styles.eventDescription}>{event.description}</Text>
          </View>
        </View>
      ))}
      <TouchableOpacity
        style={styles.button}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.text}>Tambah Status Baru</Text>
      </TouchableOpacity>
      <Modal visible={modalVisible} animationType="slide">
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Tambah Peristiwa Manual</Text>
          <TextInput
            style={styles.input}
            placeholder="Waktu"
            value={eventTime}
            onChangeText={setEventTime}
          />
          <TextInput
            style={styles.input}
            placeholder="Judul Peristiwa"
            value={eventTitle}
            onChangeText={setEventTitle}
          />
          <TextInput
            style={styles.input}
            placeholder="Deskripsi Peristiwa"
            value={eventDescription}
            onChangeText={setEventDescription}
            multiline
          />
          <TouchableOpacity style={styles.button} onPress={addTimelineEvent}>
            <Text style={styles.text}>Tambah</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttonCancel}
            onPress={() => setModalVisible(false)}
          >
            <Text style={styles.text}>Batal</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#FAFAFA",
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  timelineEvent: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  timelineIcon: {
    width: 40,
    height: 40,
    backgroundColor: "green",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  timelineContent: {
    marginLeft: 10,
  },
  eventTime: {
    fontSize: 16,
    color: "#555",
  },
  eventTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  eventDescription: {
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "#FAFAFA",
    padding: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
    padding: 10,
    marginBottom: 10,
  },
  button: {
    backgroundColor: "skyblue",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 10,
    borderRadius: 10,
  },
  buttonCancel: {
    backgroundColor: "gray",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 10,
  },
  text: {
    color: "white",
  },
});

export default StatusServicelineScreen;
