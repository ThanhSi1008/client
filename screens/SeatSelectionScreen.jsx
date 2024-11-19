import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons"; // Make sure to install @expo/vector-icons if you're using Expo

const seats = Array.from({ length: 70 }, (_, i) => ({
  id: `A${String(i + 1).padStart(2, "0")}`,
  status: i % 15 === 0 ? "occupied" : "available",
}));

const SeatSelectionScreen = ({ navigation }) => {
  const [selectedSeats, setSelectedSeats] = useState([]);
  const ticketPrice = 59;

  const toggleSeat = (seatId) => {
    setSelectedSeats((prevSelectedSeats) =>
      prevSelectedSeats.includes(seatId)
        ? prevSelectedSeats.filter((id) => id !== seatId)
        : [...prevSelectedSeats, seatId]
    );
  };

  const renderSeat = ({ item }) => {
    const isSelected = selectedSeats.includes(item.id);
    const seatStyle =
      item.status === "occupied"
        ? styles.occupiedSeat
        : isSelected
        ? styles.selectedSeat
        : styles.availableSeat;

    return (
      <TouchableOpacity
        style={[styles.seat, seatStyle]}
        disabled={item.status === "occupied"}
        onPress={() => toggleSeat(item.id)}
      >
        <Text style={styles.seatText}>{item.id}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Cosmos 1</Text>
      </View>

      {/* Seat Screen Image Placeholder */}
      <View style={styles.screen}>
        <Text style={styles.screenText}>SCREEN</Text>
      </View>

      {/* Seat Selection Area */}
      <FlatList
        data={seats}
        renderItem={renderSeat}
        keyExtractor={(item) => item.id}
        numColumns={10}
        contentContainerStyle={styles.seatContainer}
      />

      {/* Legend */}
      <View style={styles.legend}>
        <View style={styles.legendItem}>
          <View style={[styles.legendBox, styles.occupiedSeat]} />
          <Text>Booked</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.legendBox, styles.availableSeat]} />
          <Text>Available</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.legendBox, styles.selectedSeat]} />
          <Text>Selected</Text>
        </View>
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <View style={styles.movieInfo}>
          <Text style={styles.movieTitle}>Venom: The Last Dance</Text>
          <Text>19:15 - 21:04 | Wed, 15/11/2024</Text>
        </View>
        <View style={styles.totalContainer}>
          <View style={styles.priceContainer}>
            <Text>Total</Text>
            <Text style={styles.totalPrice}>
              ${selectedSeats.length * ticketPrice}
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => navigation.navigate("Product")}
            style={styles.continueButton}
          >
            <Text style={styles.continueButtonText}>Continue</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f8f8",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: 8,
  },
  screen: {
    backgroundColor: "#000",
    padding: 10,
    margin: 16,
    borderRadius: 8,
    alignItems: "center",
  },
  screenText: {
    color: "#fff",
    fontWeight: "bold",
  },
  seatContainer: {
    paddingHorizontal: 16,
    justifyContent: "center",
  },
  seat: {
    width: 32,
    height: 32,
    margin: 4,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
  },
  seatText: {
    color: "#fff",
    fontSize: 12,
  },
  availableSeat: {
    backgroundColor: "green",
  },
  occupiedSeat: {
    backgroundColor: "gray",
  },
  selectedSeat: {
    backgroundColor: "brown",
  },
  legend: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 10,
    paddingHorizontal: 16,
  },
  legendItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  legendBox: {
    width: 20,
    height: 20,
    marginRight: 8,
    borderRadius: 4,
  },
  footer: {
    flexDirection: "column",
    padding: 8,
    backgroundColor: "#f0f0f0",
  },
  movieInfo: {
    marginLeft: 8,
    marginBottom: 2,
  },
  movieTitle: {
    fontWeight: "bold",
    fontSize: 16,
  },
  totalContainer: {
    marginHorizontal: 8,
  },
  priceContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  totalPrice: {
    fontSize: 20,
    fontWeight: "bold",
    color: "red",
  },
  continueButton: {
    backgroundColor: "brown",
    alignItems: "center",
    padding: 12,
    borderRadius: 8,
    marginHorizontal: 24,
    marginBottom: 10,
  },
  continueButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default SeatSelectionScreen;
