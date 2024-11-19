import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import cinemaApi from "../cinemaApi";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState(null);

  useEffect(() => {
    const loadToken = async () => {
      const token = await AsyncStorage.getItem("authToken");
      if (token) {
        setAuthToken(token);
      }
    };

    loadToken();
  }, []);

  const signUp = async (userData) => {
    console.log(userData);
    try {
      const response = await cinemaApi.post(
        "/auth/signup",
        JSON.stringify(userData),
        { headers: { "Content-Type": "application/json" } }
      );
      const data = await response.data;

      if (data.token) {
        await AsyncStorage.setItem("authToken", data.token);
        setAuthToken(data.token);
      }
    } catch (error) {
      console.error("Sign Up Error:", error);
    }
  };

  const signIn = async (userData) => {
    try {
      console.log("User data:", userData);

      // Gửi yêu cầu đăng nhập tới API
      const response = await cinemaApi.post(
        "/auth/login",
        JSON.stringify(userData),
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      const data = response.data;
      if (data.token) {
        // Lưu token vào AsyncStorage và cập nhật state
        await AsyncStorage.setItem("authToken", data.token);
        setAuthToken(data.token);
        return true; // Đăng nhập thành công
      } else {
        return false; // Không nhận được token, đăng nhập thất bại
      }
    } catch (error) {
      return false; // Lỗi khi đăng nhập
    }
  };

  const signOut = async () => {
    await AsyncStorage.removeItem("authToken");
    setAuthToken(null);
  };

  return (
    <AuthContext.Provider value={{ authToken, signUp, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};
