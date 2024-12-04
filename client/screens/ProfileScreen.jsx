import React, { useContext } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { AuthContext } from "../contexts/AuthContext"

const ProfileScreen = ({ navigation }) => {
  const { currentUser } = useContext(AuthContext)

  console.log(currentUser)

  const recentBookings = [
    {
      id: "1",
      movie: "Venom: The Last Dance",
      date: "Wed, 15 Nov 2024",
      time: "19:15",
    },
    {
      id: "2",
      movie: "Spider-Man: No Way Home",
      date: "Fri, 16 Nov 2024",
      time: "17:45",
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color="black" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Profile</Text>
        </View>

        {/* Account Information */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Account Information</Text>
          <TouchableOpacity onPress={() => navigation.navigate("AccountInfo")}>
            <View style={styles.accountInfoContainer}>
              <Image
                source={{uri: currentUser.user.avatar}}
                style={styles.profilePicture}
              />
              <View style={styles.accountDetails}>
                <Text style={styles.userName}>{currentUser.user.full_name}</Text>
                <Text style={styles.userEmail}>{currentUser.user.email}</Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>

        {/* Booking Management */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Booking Management</Text>
          <TouchableOpacity style={styles.optionButton}>
            <Text style={styles.optionText}>View Current Bookings</Text>
            <Ionicons name="chevron-forward" size={20} color="gray" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.optionButton}>
            <Text style={styles.optionText}>Manage Payment Methods</Text>
            <Ionicons name="chevron-forward" size={20} color="gray" />
          </TouchableOpacity>
        </View>

        {/* Booking History */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Booking History</Text>
          {recentBookings.map((booking) => (
            <View key={booking.id} style={styles.bookingHistoryItem}>
              <View>
                <Text style={styles.movieTitle}>{booking.movie}</Text>
                <Text style={styles.bookingDate}>
                  {booking.date} at {booking.time}
                </Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color="gray" />
            </View>
          ))}
        </View>

        {/* Logout Button */}
        <View style={styles.section}>
          <TouchableOpacity
            onPress={() => navigation.navigate("Login")}
            style={styles.logoutButton}
          >
            <Text style={styles.logoutButtonText}>Logout</Text>
            <Ionicons name="log-out" size={20} color="gray" />
          </TouchableOpacity>
        </View>
      </ScrollView>
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
  section: {
    backgroundColor: "#fff",
    padding: 16,
    marginVertical: 8,
    borderRadius: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  accountInfoContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  profilePicture: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 16,
  },
  accountDetails: {
    flex: 1,
  },
  userName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  userEmail: {
    fontSize: 16,
    color: "#666",
  },
  optionButton: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  optionText: {
    fontSize: 16,
  },
  bookingHistoryItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  movieTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  bookingDate: {
    fontSize: 14,
    color: "#666",
  },
  logoutButton: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  logoutButtonText: {
    fontSize: 16,
    color: "red", // Màu sắc nổi bật cho nút Logout
  },
});

export default ProfileScreen;
