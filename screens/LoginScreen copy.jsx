import React, { useState } from "react";
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  Alert,
  TouchableOpacity,
} from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import cinemaApi from "../cinemaApi"

const LoginScreen = ({ navigation }) => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Hàm xử lý đăng nhập
  const handleLogin = async () => {
    setLoading(true);
    setErrorMessage(""); // Xóa thông báo lỗi cũ

    try {
      // Gửi yêu cầu POST tới API để đăng nhập
      const response = await cinemaApi.post("/auth/login", {
        user_name: userName,
        password: password,
      });

      // Lấy thông tin người dùng và token từ response
      const { message, user, token } = response.data;

      if (token) {
        // Lưu token vào AsyncStorage
        await AsyncStorage.setItem("userToken", token);
      }

      // Nếu đăng nhập thành công, chuyển hướng đến trang Home
      Alert.alert("Login Successful", message);
      navigation.navigate("Home");

      console.log("User Info:", user); // Hiển thị thông tin người dùng
    } catch (error) {
      setLoading(false);

      // Nếu có lỗi xảy ra trong quá trình đăng nhập, hiển thị thông báo lỗi
      if (error.response) {
        // Nếu có phản hồi từ server (ví dụ: lỗi 400, 404)
        Alert.alert("Login Failed", error.response.data.message);
      } else {
        // Nếu có lỗi mạng hoặc lỗi không có phản hồi từ server
        Alert.alert(
          "Login Failed",
          "An error occurred. Please try again later."
        );
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Login</Text>

      {errorMessage && <Text style={styles.errorText}>{errorMessage}</Text>}

      <TextInput
        style={styles.input}
        placeholder="Username"
        value={userName}
        onChangeText={setUserName}
        autoCapitalize="none"
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        autoCapitalize="none"
      />

      <TouchableOpacity
        style={[styles.button, loading && styles.buttonDisabled]}
        onPress={handleLogin}
        disabled={loading}
      >
        <Text style={styles.buttonText}>
          {loading ? "Logging in..." : "Login"}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  header: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 40,
  },
  input: {
    width: "100%",
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    marginBottom: 15,
    paddingLeft: 10,
    borderRadius: 5,
  },
  errorText: {
    color: "red",
    marginBottom: 10,
  },
  button: {
    backgroundColor: "#007bff",
    paddingVertical: 10,
    paddingHorizontal: 40,
    borderRadius: 5,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
  },
  buttonDisabled: {
    backgroundColor: "#cccccc",
  },
});

export default LoginScreen;
