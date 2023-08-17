import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { StyleSheet, Text, View } from "react-native";
import DashboardScreen from "./src/screens/DashboardScreen";
import CustomDrawer from "./src/components/CustomDrawer";
import TimeScreen from "./src/screens/TimeScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AddTimeScreen from "./src/screens/AddTimeScreen";
import { PaperProvider } from "react-native-paper";
import EditTimeScreen from "./src/screens/EditTimeScreen";
import DateScreen from "./src/screens/DateScreen";
import AddDateScreen from "./src/screens/AddDateScreen";
import EditDateScreen from "./src/screens/EditDateScreen";
import RoomScreen from "./src/screens/RoomScreen";
import AddRoomScreen from "./src/screens/AddRoomScreen";
import EditRoomScreen from "./src/screens/EditRoomScreen";
import ReservationScreen from "./src/screens/ReservationScreen";
import TransactionScreen from "./src/screens/TransactionScreen";
import StatusServiceScreen from "./src/screens/StatusServiceScreen";
import LoginScreen from "./src/screens/LoginScreen";

// const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

function DrawerScreen() {
  return (
    <Drawer.Navigator drawerContent={(props) => <CustomDrawer {...props} />}>
      <Drawer.Screen name="Dashboard Admin" component={DashboardScreen} />
      <Drawer.Screen name="Waktu" component={TimeScreen} />
      <Drawer.Screen name="Tanggal" component={DateScreen} />
      <Drawer.Screen name="Tempat" component={RoomScreen} />
      <Drawer.Screen name="Reservasi" component={ReservationScreen} />
      <Drawer.Screen name="Transaksi" component={TransactionScreen} />
      <Drawer.Screen name="Status Servis" component={StatusServiceScreen} />
    </Drawer.Navigator>
  );
}

export default function App() {
  return (
    <PaperProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Dashboard"
            component={DrawerScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen name="Tambah Waktu" component={AddTimeScreen} />
          <Stack.Screen name="Edit Waktu" component={EditTimeScreen} />
          <Stack.Screen name="Tambah Tanggal" component={AddDateScreen} />
          <Stack.Screen name="Edit Tanggal" component={EditDateScreen} />
          <Stack.Screen name="Tambah Tempat" component={AddRoomScreen} />
          <Stack.Screen name="Edit Tempat" component={EditRoomScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
