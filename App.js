import { NavigationContainer } from "@react-navigation/native";
// import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import DashboardScreen from "./src/screens/DashboardScreen";
import CustomDrawer from "./src/components/CustomDrawer";

// const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator drawerContent={(props) => <CustomDrawer {...props} />}>
        <Drawer.Screen name="Dashboard Admin" component={DashboardScreen} />
        {/* <Drawer.Screen name="Pengguna" component={WriteTagScreen} />
        <Drawer.Screen name="Status Reservasi" component={ReadTagScreen} />
        <Drawer.Screen name="Reservasi" component={EditTagScreen} />
        <Drawer.Screen name="Transaksi" component={ReadDataScreen} /> */}
      </Drawer.Navigator>
    </NavigationContainer>
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
