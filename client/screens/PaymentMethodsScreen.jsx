import React, { useContext, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { AuthContext } from "../contexts/AuthContext";
import ScreeningContext from "../contexts/ScreeningContext";
import SeatProductContext from "../contexts/SeatProductContext";
import cinemaApi from "../cinemaApi";

const PaymentMethodsScreen = ({ navigation, route }) => {
  const { movie, foodItems, grandTotal } = route.params;
  const { currentUser } = useContext(AuthContext);
  const { screenings } = useContext(ScreeningContext);
  const { seatProduct, dispatchSeatProduct } = useContext(SeatProductContext);
  const [isLoading, setLoading] = useState(false);

  const handlePayment = async (method) => {
    setLoading(true);

    const seat_locations = seatProduct.seats;
    const screening_id = screenings.screening.screening_id;

    console.log(seat_locations);
    console.log(screening_id);

    try {
      // Step 1: Update seats
      await cinemaApi.put(
        "/screenings/update-seats",
        { screening_id, seat_locations },
        {
          headers: {
            Authorization: `Bearer ${currentUser.token}`,
          },
        }
      );

      console.log("Seats updated successfully");

      // Step 2: Create order
      console.log({
        total: grandTotal,
        seats: seatProduct.seats.map((seat) => ({
          seat_location: seat,
        })),
        screening_id,
        products: seatProduct.chosenProducts.map(chosenProduct => {
          return {
            product: {
              product_id: chosenProduct.id,
              name: chosenProduct.name,
              price: chosenProduct.price
            },
            quantity: chosenProduct.quantity
          }
        })
      })
      console.log(seatProduct.chosenProducts.map(chosenProduct => {
        return {
          product: {
            product_id: chosenProduct.id,
            name: chosenProduct.name,
            price: chosenProduct.price
          },
          quantity: chosenProduct.quantity
        }
      }))
      await cinemaApi.post(
        "/orders",
        {
          total: grandTotal,
          seats: seatProduct.seats.map((seat) => ({
            seat_location: seat,
          })),
          screening_id,
          products: seatProduct.chosenProducts.map(chosenProduct => {
            return {
              product: {
                product_id: chosenProduct.id,
                name: chosenProduct.name,
                price: chosenProduct.price
              },
              quantity: chosenProduct.quantity
            }
          })
        },
        {
          headers: {
            Authorization: `Bearer ${currentUser.token}`,
          },
        }
      );

      console.log("Order created successfully");

      dispatchSeatProduct({ type: "RESET" })

      // Step 3: Navigate to Invoice
      navigation.navigate("Invoice", { movie, foodItems, grandTotal, method });
    } catch (err) {
      console.error("Error in payment process:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select Payment Method</Text>
      <TouchableOpacity
        style={styles.methodButton}
        onPress={() => handlePayment("Credit Card")}
        disabled={isLoading}
      >
        <Text style={styles.methodText}>Credit Card</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.methodButton}
        onPress={() => handlePayment("PayPal")}
        disabled={isLoading}
      >
        <Text style={styles.methodText}>PayPal</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.methodButton}
        onPress={() => handlePayment("Cash")}
        disabled={isLoading}
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
