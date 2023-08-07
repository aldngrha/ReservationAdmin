import { View, Text, StyleSheet } from "react-native";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";

const TimeTable = ({ data, onSelectTime, selectedTime }) => {
  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.timeItem,
        item.id === selectedTime ? styles.selectedTime : null,
      ]}
      onPress={() => onSelectTime(item.id)}
    >
      <Text style={styles.timeText}>{item.nama_waktu}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  table: {
    borderWidth: 1,
    borderColor: "#dee2e6",
    borderRadius: 4,
    paddingVertical: 8,
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
});

export default TimeTable;
