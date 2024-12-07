import React, { useContext, useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons"; 
import ScreeningContext from "../contexts/ScreeningContext"
import { MovieContext } from "../contexts/MovieContext"
import SeatProductContext from "../contexts/SeatProductContext"

function formatTime(dateString) {
  const date = new Date(dateString);
  if (isNaN(date)) {
    throw new Error("Invalid date string");
  }
  const hours = String(date.getUTCHours()).padStart(2, "0");
  const minutes = String(date.getUTCMinutes()).padStart(2, "0");
  return `${hours}:${minutes}`;
}

function getDayOfWeek(dateString) {
  const daysOfWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
  const date = new Date(dateString);
  return daysOfWeek[date.getUTCDay()]; // Get the day of the week in UTC
}

function getFormattedDate(dateString) {
  const date = new Date(dateString);
  const day = String(date.getUTCDate()).padStart(2, "0");
  const month = String(date.getUTCMonth() + 1).padStart(2, "0");
  const year = date.getUTCFullYear();
  return `${day}/${month}/${year}`; // Format as DD/MM/YYYY
}


const SeatSelectionScreen = ({ route, navigation }) => { 
  const { screenings } = useContext(ScreeningContext)
  const { movie } = useContext(MovieContext)
  const { theater_name } = route.params;

  const { seatProduct, dispatchSeatProduct } = useContext(SeatProductContext)
  const { seats: selectedSeats } = seatProduct
  // const [selectedSeats, setSelectedSeats] = useState([]);
  const ticketPrice = screenings.screening.ticket_price;
  // console.log(screenings.screening)

  const toggleSeat = (seatLocation) => {
    dispatchSeatProduct({ type: "SET_SEATS", payload: selectedSeats.includes(seatLocation) ? selectedSeats.filter((location) => location !== seatLocation) : [...selectedSeats, seatLocation] })
  };

  const renderSeat = ({ item: seat }) => {
    const isSelected = selectedSeats.includes(seat.seat_location);
    const seatStyle = seat.status === false ? styles.occupiedSeat : isSelected ? styles.selectedSeat : styles.availableSeat;
    return (
      <TouchableOpacity
        style={[styles.seat, seatStyle]}
        disabled={seat.status === false}
        onPress={() => toggleSeat(seat.seat_location)}
      >
        <Text style={styles.seatText}>{seat.seat_location}</Text>
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

        <Text style={styles.headerTitle}>{theater_name}</Text>
      </View>

      {/* Seat Screen Image Placeholder */}
      <View style={styles.screen}>
        <Text style={styles.screenText}>SCREEN</Text>
      </View>

      {/* Seat Selection Area */}
      <View style={{ flex: 1, marginHorizontal: 16 }}>
        <FlatList
          data={screenings.screening.seats}
          renderItem={renderSeat}
          keyExtractor={(item) => item.seat_location}
          numColumns={10}
          contentContainerStyle={{
            flexWrap: "wrap",
            justifyContent: "center",
            paddingBottom: 16
          }}
          showsHorizontalScrollIndicator={false}
        />
      </View>

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
          <Text style={styles.movieTitle}>{movie.movie_name}</Text>
          <Text>{`${formatTime(screenings.screening.screening_time)} - ${formatTime(screenings.screening.end_time)} | ${getDayOfWeek(screenings.screening.screening_time)}, ${getFormattedDate(screenings.screening.screening_time)}`}</Text>
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
    width: 28,
    height: 28,
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
