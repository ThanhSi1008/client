import React, { useContext, useEffect } from "react";
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
import cinemaApi from "../cinemaApi"
import OrderContext from "../contexts/OrderContext"
import Loading from "../components/Loading"

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


const ProfileScreen = ({ navigation }) => {
  const { currentUser } = useContext(AuthContext)
  const { orders, dispatchOrders } = useContext(OrderContext)

  console.log(currentUser)

  useEffect(() => {
    async function fetchScreenings() {
      try {
        dispatchOrders({type: "FETCH_ORDERS_PENDING"})
        const response = await cinemaApi.get(`/orders`, { headers: { Authorization: `Bearer ${currentUser.token}` }})
        dispatchOrders({type: "FETCH_ORDERS_SUCCESS", payload: response.data.orders})
      } catch (error) {
        console.log(error)
        dispatchOrders({type: "FETCH_ORDERS_FAILURE", error})
      }
    }
    fetchScreenings()
  }, [])

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

  function handleOrderDetailsPressed(order) {
    const movie = {
      title: order.movie_name,
      time: `${formatTime(order.screening_time)} - ${formatTime(order.end_time)} | ${getDayOfWeek(order.screening_time)}, ${getFormattedDate(order.screening_time)}`,
      room: order.room_name,
      seat: order.seats.map(seat => seat.seat_location).join(","),
      theater: order.theater_name,
      address: `${order.address.street}, ${order.address.city}, ${order.address.state}, ${order.address.zipcode}`,
      price: order.ticket_price * order.seats.length,
    };
    const foodItems = order.products.map(product => ({
      name: product.product.name,
      price: product.product.price,
      quantity: product.quantity
    }))
    const grandTotal = order.total

    navigation.navigate("OrderDetails", { movie, foodItems, grandTotal });
  }

  if (orders.isLoading) {
    return <Loading/>
  }

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
          {orders.orders.map((order) => (
            <TouchableOpacity onPress={() => handleOrderDetailsPressed(order)} key={order.order_id} style={styles.bookingHistoryItem}>
              <View>
                <Text style={styles.movieTitle}>{order.movie_name}</Text>
                <Text style={styles.bookingDate}>
                  {getFormattedDate(order.order_date)} at {formatTime(order.order_date)}
                </Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color="gray" />
            </TouchableOpacity>
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
