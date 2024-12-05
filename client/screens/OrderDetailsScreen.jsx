import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import QRCode from "react-native-qrcode-svg"; // Import QR code library
import { Ionicons } from "@expo/vector-icons"; // Import Ionicons for icons
import { SafeAreaView } from "react-native-safe-area-context";

const InvoiceScreen = ({ route, navigation }) => {
  const { movie, foodItems, grandTotal } = route.params;
  // Generate QR data (you can modify it based on your needs)
  const qrData = {
    movieTitle: movie.title,
    grandTotal: grandTotal,
    time: movie.time,
    seats: movie.seat,
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        {/* Header with Home button */}
        <View style={{flexDirection: "row", alignItems: "center", marginBottom: 6}}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>

        <Text style={{ fontSize: 20, fontWeight: "bold", marginLeft: 8 }}>Ticket</Text>
      </View>


        {/* Movie Information */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Movie Details</Text>
          <Text style={styles.itemText}>Movie: {movie.title}</Text>
          <Text style={styles.itemText}>Time: {movie.time}</Text>
          <Text style={styles.itemText}>Room: {movie.room}</Text>
          <Text style={styles.itemText}>Seat(s): {movie.seat}</Text>
          <Text style={styles.itemText}>Theater: {movie.theater}</Text>
          <Text style={styles.itemText}>Address: {movie.address}</Text>
          <Text style={styles.totalPrice}>Movie Price: ${movie.price}</Text>
        </View>

        {/* Food and Drinks Information */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Food and Drinks</Text>
          {foodItems.map((item) => (
            <View key={item.id} style={styles.itemRow}>
              <Text style={styles.itemText}>{item.name}</Text>
              <Text style={styles.itemText}>
                {item.quantity} x ${item.price}
              </Text>
              <Text style={styles.itemText}>
                Total: ${item.price * item.quantity}
              </Text>
            </View>
          ))}
          <Text style={styles.totalPrice}>
            Food Total: ${grandTotal - movie.price}
          </Text>
        </View>

        {/* Grand Total */}
        <Text style={styles.grandTotal}>Grand Total: ${grandTotal}</Text>

        {/* QR Code */}
        <View style={styles.qrContainer}>
          <QRCode
            value={JSON.stringify(qrData)} // Pass the data you want to encode in the QR code
            size={200}
            color="black"
            backgroundColor="white"
          />
          <Text style={styles.qrTitle}>
            Show this QR Code to the ticket inspector to enter the theater.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f8f8f8",
  },
  scrollContainer: {
    paddingBottom: 30,
  },
  headerContainer: {
    flexDirection: "row", // Place header and home button in the same row
    justifyContent: "center", // Ensure the header stays on the left side
    alignItems: "center", // Vertically align items in the center
    marginTop: 16,
    paddingHorizontal: 16, // Padding to ensure space around the text and button
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },
  homeButton: {
    position: "absolute",
    right: 16,
    padding: 4,
  },
  section: {
    marginVertical: 12,
    padding: 16,
    backgroundColor: "#fff",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#333",
  },
  itemText: {
    fontSize: 16,
    color: "#555",
    marginBottom: 4,
  },
  totalPrice: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 8,
    color: "#333",
  },
  itemRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 4,
  },
  grandTotal: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#e74c3c",
    textAlign: "center",
    marginTop: 24,
  },
  qrContainer: {
    alignItems: "center",
    marginTop: 24,
    padding: 16,
    backgroundColor: "#fff",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  qrTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 8,
  },
});

export default InvoiceScreen;
