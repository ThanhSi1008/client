import React, { useContext, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { AuthContext } from "../contexts/AuthContext"
import ScreeningContext from "../contexts/ScreeningContext"
import SeatProductContext from "../contexts/SeatProductContext";
import cinemaApi from "../cinemaApi"

const PaymentMethodsScreen = ({ navigation, route }) => {
  const { movie, foodItems, grandTotal } = route.params;
  const { currentUser } = useContext(AuthContext)
  const { screenings } = useContext(ScreeningContext)
  const { seatProduct } = useContext(SeatProductContext)
  const [isLoading, setLoading] = useState(false);

  const handlePayment = (method) => {
    
    // Update seatings in the screening
    setLoading(true)
    const seat_locations = seatProduct.seats;
    const screening_id = screenings.screening.screening_id;

    console.log(seat_locations)
    console.log(screening_id)
  
    const updateSeats = async () => {
      try {
        setLoading(true);
        const response = await cinemaApi.put(
          "/screenings/update-seats",
          { 
            screening_id, 
            seat_locations
          },
          {
            headers: {
              Authorization: `Bearer ${currentUser.token}`,
            },
          }
        );
        console.log(response.data);
        navigation.navigate("Invoice", { movie, foodItems, grandTotal, method });
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    updateSeats()

    // Create new order 
    
    
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