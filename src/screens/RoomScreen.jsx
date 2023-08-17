import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import { FlatList } from "react-native-gesture-handler";
import { Alert } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { database } from "../../firebaseConfig";
import { onValue, ref, remove } from "firebase/database";

const RoomScreen = () => {
  const [roomData, setRoomData] = useState([]); // State untuk data waktu

  const navigation = useNavigation();

  useEffect(() => {
    const fetchData = async () => {
      const timeRef = ref(database, "rooms");
      onValue(timeRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          const newData = Object.keys(data).map((key) => ({
            key: key, // Menambahkan kunci unik ke dalam objek data
            tempat: data[key].tempat,
          }));
          setRoomData(newData);
        }
      });
    };
    fetchData();
  }, []);

  const handleDeleteDate = (roomId) => {
    // Fungsi untuk menghandle hapus waktu berdasarkan ID
    Alert.alert("Konfirmasi", "Apakah Anda yakin ingin menghapus tempat ini?", [
      { text: "Batal", style: "cancel" },
      {
        text: "Hapus",
        onPress: () => {
          const timeRef = ref(database, `rooms/${roomId}`);

          remove(timeRef)
            .then(() => {
              Alert.alert("Sukses", "Data tempat berhasil dihapus");
              // Anda bisa menavigasi kembali ke halaman daftar waktu
              // navigation.navigate("TimeScreen");
            })
            .catch((error) => {
              Alert.alert("Error", "Gagal menghapus data tempat");
            });
        },
        style: "destructive",
      },
    ]);
  };

  const renderItem = ({ item, index }) => (
    <View style={styles.row}>
      <Text style={styles.cell}>{index + 1}</Text>
      <Text style={styles.cell}>{item.tempat}</Text>
      <TouchableOpacity
        style={styles.editButton}
        onPress={() =>
          navigation.navigate("Edit Tempat", {
            initialRoom: item.tempat,
            key: item.key,
          })
        }
      >
        <MaterialCommunityIcons name="pencil" size={17} color="white" />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => handleDeleteDate(item.key)}
      >
        <MaterialCommunityIcons name="trash-can" size={17} color="white" />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.beforeHead}>
        <Text style={styles.timeDataText}>Data Tempat</Text>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => navigation.navigate("Tambah Tempat")}
        >
          <Text style={styles.addText}>Tambah</Text>
          <MaterialCommunityIcons name="trash-can" size={17} color="white" />
        </TouchableOpacity>
      </View>
      <View style={styles.header}>
        <Text style={styles.headerText}>No</Text>
        <Text style={styles.headerText}>Tempat</Text>
        <Text style={styles.headerText}>Action</Text>
      </View>
      <FlatList
        data={roomData}
        keyExtractor={(item) => Object.keys(item)[0]}
        renderItem={renderItem}
        contentContainerStyle={styles.table}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FAFAFA",
    padding: 20,
  },
  table: {
    borderWidth: 1,
    borderColor: "#dee2e6",
    borderRadius: 4,
    paddingVertical: 8,
    backgroundColor: "#fff",
  },
  beforeHead: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
    alignItems: "center",
  },
  timeDataText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: "#dee2e6",
    backgroundColor: "#fff",
  },
  headerText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#212529",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#dee2e6",
  },
  selectedRow: {
    backgroundColor: "#007bff",
  },
  cell: {
    flex: 1,
    fontSize: 16,
    color: "#212529",
  },
  editButton: {
    padding: 7,
    backgroundColor: "#E4A11B",
    borderRadius: 7,
    marginRight: 10,
  },
  deleteButton: {
    padding: 7,
    backgroundColor: "red",
    borderRadius: 7,
  },
  addButton: {
    padding: 7,
    backgroundColor: "skyblue",
    borderRadius: 7,
    flexDirection: "row",
  },
  addText: {
    color: "white",
    marginRight: 5,
  },
});

export default RoomScreen;
