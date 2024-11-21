import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import cinemaApi from "../cinemaApi";
import jwt_decode from "jwt-decode";
import { jwtDecode } from "jwt-decode";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState(null);
  const [userId, setUserId] = useState(null); // Lưu trữ userId sau khi decode token

  useEffect(() => {
    const loadToken = async () => {
      try {
        const token = await AsyncStorage.getItem("authToken");
        if (token) {
          setAuthToken(token);
          const decodedToken = jwtDecode(token); // Decode token
          setUserId(decodedToken.user_id); // Lấy userId từ payload của token
        }
      } catch (error) {
        console.error("Error loading token:", error);
      }
    };

    loadToken();
  }, []);

  const signUp = async (userData) => {
    
    try {
      const response = await cinemaApi.post(
        "/auth/signup",
        JSON.stringify(userData),
        { headers: { "Content-Type": "application/json" } }
      );

      const data = response.data;
      console.log("Decoded Token:", jwtDecode(data.token));

      if (data.token) {
        await AsyncStorage.setItem("authToken", data.token);
        setAuthToken(data.token);
        const decodedToken = jwtDecode(data.token);
        setUserId(decodedToken.user_id);
      }
    } catch (error) {
      console.error("Sign Up Error:", error);
    }
  };

  const signIn = async (userData) => {
    try {
      const response = await cinemaApi.post(
        "/auth/login",
        JSON.stringify(userData),
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      const data = response.data;
      console.log("Decoded Token:", jwtDecode(data.token));

      if (data.token) {
        await AsyncStorage.setItem("authToken", data.token);
        setAuthToken(data.token);
        const decodedToken = jwtDecode(data.token);
        setUserId(decodedToken._id);
        return true; // Đăng nhập thành công
      } else {
        return false; // Đăng nhập thất bại
      }
    } catch (error) {
      console.error("Sign In Error:", error);
      return false; // Đăng nhập thất bại
    }
  };

  const signOut = async () => {
    try {
      await AsyncStorage.removeItem("authToken");
      setAuthToken(null);
      setUserId(null); // Xoá userId khi đăng xuất
    } catch (error) {
      console.error("Sign Out Error:", error);
    }
  };

  return (
    <AuthContext.Provider
      value={{ authToken, userId, signUp, signIn, signOut }}
    >
      {children}
    </AuthContext.Provider>
  );
};
