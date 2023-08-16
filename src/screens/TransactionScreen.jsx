import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { FlatList, ScrollView } from "react-native-gesture-handler";
import { Alert } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const TransactionScreen = () => {
  const [selectedTime, setSelectedTime] = useState(null);

  const navigation = useNavigation();

  // Data dummy untuk waktu
  const reservationData = [
    {
      id: 1,
      user: "Aldi",
      status: "Pending",
    },
    {
      id: 2,
      user: "Nugraha",
      status: "Accept",
    },
    {
      id: 3,
      user: "Cecilia",
      status: "Decline",
    },
    {
      id: 4,
      user: "Dewi",
      status: "Pending",
    },
  ];

  const handleDeleteDate = (dateId) => {
    // Fungsi untuk menghandle hapus waktu berdasarkan ID
    // Misalnya, munculkan konfirmasi sebelum menghapus waktu
    Alert.alert("Konfirmasi", "Apakah Anda yakin ingin menghapus waktu ini?", [
      { text: "Batal", style: "cancel" },
      {
        text: "Hapus",
        onPress: () => {
          console.log("Hapus waktu dengan ID:", dateId);
          // Tambahkan logika hapus waktu sesuai dengan kebutuhan Anda
        },
        style: "destructive",
      },
    ]);
  };

  const renderItem = ({ item }) => (
    <View style={styles.row}>
      <Text style={styles.cell}>{item.id}</Text>
      <Text style={styles.cell}>{item.user}</Text>
      <Text style={styles.cell}>{item.status}</Text>
      <TouchableOpacity
        style={styles.editButton}
        onPress={() => navigation.navigate("Edit Tempat")}
      >
        <AntDesign name="eye" size={17} color="white" />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <View>
          <View style={styles.beforeHead}>
            <Text style={styles.timeDataText}>Data Transaksi</Text>
          </View>
          <View style={styles.header}>
            <Text style={[styles.headerText, styles.headerItem]}>No</Text>
            <Text style={[styles.headerText, styles.headerItem]}>Nama</Text>
            <Text style={[styles.headerText, styles.headerItem]}>Status</Text>
            <Text style={[styles.headerText, styles.headerItem]}>Action</Text>
          </View>
          <View style={styles.table}>
            <FlatList
              data={reservationData}
              keyExtractor={(item) => item.id.toString()}
              renderItem={renderItem}
            />
          </View>
        </View>
      </ScrollView>
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
    flexGrow: 1,
    borderWidth: 1,
    borderColor: "#dee2e6",
    borderRadius: 4,
    paddingVertical: 8,
    backgroundColor: "#fff",
    width: 365,
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
  headerItem: {
    flex: 1,
    width: 65,
    minWidth: 95,
  },
  headerText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#212529",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 8,
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
    backgroundColor: "#007bff",
    borderRadius: 7,
    marginRight: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  deleteButton: {
    padding: 7,
    backgroundColor: "red",
    borderRadius: 7,
    justifyContent: "center",
    alignItems: "center",
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

export default TransactionScreen;
