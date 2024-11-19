import React, { useContext, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Image,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import { AuthContext } from "../contexts/AuthContext";
import { SafeAreaView } from "react-native-safe-area-context";

const LoginScreen = ({ navigation }) => {
  const { signIn } = useContext(AuthContext); // Get signIn from AuthContext
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    const userData = { username, password };

    try {
      const success = await signIn(userData); // Kiểm tra đăng nhập có thành công không
      if (success) {
        navigation.navigate("Home");
      } else {
        Alert.alert("Login Failed", "Invalid username or password");
      }
    } catch (error) {
      Alert.alert("Login Failed", "An error occurred during login.");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ flex: 1, justifyContent: "center", paddingBottom: "25%" }}>
        <Image
          source={require("../assets/logo.png")}
          style={{ width: 64, height: 64, marginBottom: 16 }}
        />
        <Text style={styles.title}>Login</Text>

        {/* username Input */}
        <TextInput
          placeholder="Username"
          style={styles.input}
          onChangeText={setUsername}
          autoCapitalize="none"
        />

        {/* Password Input */}
        <TextInput
          placeholder="Password"
          style={styles.input}
          secureTextEntry
          onChangeText={setPassword}
          autoCapitalize="none"
        />

        {/* Login Button */}
        <TouchableOpacity
          style={{
            backgroundColor: "#B22222",
            paddingVertical: 12,
            borderRadius: 8,
          }}
          onPress={handleLogin}
        >
          <Text
            style={{ color: "white", textAlign: "center", fontWeight: "bold" }}
          >
            Login
          </Text>
        </TouchableOpacity>

        {/* Footer Text */}
        <Text style={styles.footerText}>
          By logging in, you agree to our Conditions of Use and Privacy Notice
        </Text>

        {/* Navigate to SignUp */}
        <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
          <Text style={styles.link}>New User? Sign up</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { padding: 16, flex: 1 },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 16 },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: "#DFDFDF",
    marginBottom: 16,
    paddingBottom: 8,
  },
  footerText: {
    fontSize: 14,
    color: "gray",
    textAlign: "center",
    marginTop: 16,
    paddingHorizontal: 16,
  },
  link: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#B71C1C",
    textAlign: "center",
    marginTop: 8,
  },
});

export default LoginScreen;
