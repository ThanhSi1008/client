import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const PaymentMethodsScreen = ({ navigation, route }) => {
  const { movie, foodItems, grandTotal } = route.params;

  const handlePayment = (method) => {
    // Xử lý logic thanh toán ở đây (gửi đến server hoặc tiếp tục đến màn hình hóa đơn)
    navigation.navigate("Invoice", { movie, foodItems, grandTotal, method });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select Payment Method</Text>
      <TouchableOpacity
        style={styles.methodButton}
        onPress={() => handlePayment("Credit Card")}
      >
        <Text style={styles.methodText}>Credit Card</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.methodButton}
        onPress={() => handlePayment("PayPal")}
      >
        <Text style={styles.methodText}>PayPal</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.methodButton}
        onPress={() => handlePayment("Cash")}
      >
        <Text style={styles.methodText}>Cash</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f8f8f8",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  methodButton: {
    backgroundColor: "#4CAF50",
    padding: 15,
    borderRadius: 8,
    marginVertical: 10,
    width: "80%",
    alignItems: "center",
  },
  methodText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default PaymentMethodsScreen;