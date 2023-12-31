import React, { useEffect, useState } from "react";
import {
  TextInput,
  TouchableOpacity,
  View,
  StyleSheet,
  Text,
  Image,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { auth } from "../../firebaseConfig";
import { ActivityIndicator } from "react-native-paper";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false); // State for loading indicator

  const navigation = useNavigation();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        navigation.navigate("Dashboard");
      }
    });

    return unsubscribe;
  }, []);

  const handleLogin = () => {
    setIsLoading(true); // Start loading
    auth
      .signInWithEmailAndPassword(email, password)
      .then((userCredentials) => {
        const user = userCredentials.user;
        Alert.alert("Logged In With: ", user.email);
      })
      .catch((error) => {
        Alert.alert("Email atau password salah");
      })
      .finally(() => {
        setIsLoading(false); // Stop loading
      });
  };

  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.textAdmin}>Login Admin</Text>
      </View>
      <View style={styles.imageContainer}>
        <Image
          source={require("../../assets/login.png")}
          style={styles.image}
          resizeMode="cover"
        />
      </View>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={(text) => setEmail(text)}
        style={styles.input}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={(text) => setPassword(text)}
        secureTextEntry
        style={styles.input}
      />
      <TouchableOpacity
        onPress={handleLogin}
        style={[styles.button, isLoading && styles.buttonLoading]}
        disabled={isLoading}
      >
        {isLoading ? (
          <ActivityIndicator size="small" color="white" />
        ) : (
          <Text style={styles.text}>Login</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "white",
  },
  textContainer: {
    alignItems: "center",
    marginBottom: 30,
  },
  textAdmin: {
    fontSize: 25,
    fontWeight: "bold",
  },
  imageContainer: {
    width: 400, // Atur ukuran wadah sesuai keinginan Anda
    height: 270, // Atur ukuran wadah sesuai keinginan Anda
    justifyContent: "center", // Gambar akan berada di tengah secara vertikal
    alignItems: "center",
    marginLeft: -20, // Gambar akan berada di tengah secara horizontal
  },
  image: {
    width: "100%", // Ukuran gambar akan mengisi seluruh lebar wadah
    height: "100%", // Ukuran gambar akan mengisi seluruh tinggi wadah
  },
  input: {
    borderWidth: 1,
    borderColor: "#acacac",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  button: {
    marginTop: 10,
    backgroundColor: "skyblue",
    paddingVertical: 15,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
  },
  buttonLoading: {
    opacity: 0.6,
    backgroundColor: "skyblue",
  },
  text: {
    color: "white",
  },
  loadingIndicator: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: [{ translateX: -25 }, { translateY: -25 }],
    zIndex: 1,
  },
});

export default LoginScreen;
