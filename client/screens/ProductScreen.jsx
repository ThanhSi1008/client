import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";

const items = [
  { id: "1", name: "Popcorn Large", price: 59, image: "https://res.cloudinary.com/dlrtv3tla/image/upload/v1731620477/Pngtree_popcorn_border_clipart_this_image_11054087_llaq92.png" },
  { id: "2", name: "ocaCola", price: 59, image: "https://res.cloudinary.com/dlrtv3tla/image/upload/v1731620566/favpng_the-coca-cola-company-soft-drink-pepsi_uveehb.png" },
  { id: "3", name: "Combo Popcorn & Drink", price: 59, image: "https://res.cloudinary.com/dlrtv3tla/image/upload/v1731621027/97cathay_cineplexes_q106rh.jpg" },
];

const ProductScreen = ({ navigation }) => {
  const [quantities, setQuantities] = useState({ 1: 0, 2: 0, 3: 0 });

  const handleIncrement = (id) => {
    setQuantities((prev) => ({ ...prev, [id]: prev[id] + 1 }));
  };

  const handleDecrement = (id) => {
    setQuantities((prev) => ({ ...prev, [id]: Math.max(0, prev[id] - 1) }));
  };

  const totalPrice = items.reduce(
    (total, item) => total + item.price * quantities[item.id],
    0
  );

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Image source={{uri: item.image}} style={styles.itemImage} />
      <View style={styles.itemDetails}>
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.itemPrice}>${item.price}</Text>
        <View style={styles.quantityContainer}>
          <TouchableOpacity
            onPress={() => handleDecrement(item.id)}
            style={styles.quantityButton}
          >
            <Text style={styles.quantityButtonText}>-</Text>
          </TouchableOpacity>
          <Text style={styles.quantityText}>{quantities[item.id]}</Text>
          <TouchableOpacity
            onPress={() => handleIncrement(item.id)}
            style={styles.quantityButton}
          >
            <Text style={styles.quantityButtonText}>+</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Food and Drinks</Text>
      </View>

      {/* Item List */}
      <FlatList
        data={items}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
      />

      {/* Footer */}
      <View style={styles.footer}>
        <View style={styles.totalContainer}>
          <Text style={styles.totalLabel}>Total</Text>
          <Text style={styles.totalPrice}>${totalPrice}</Text>
        </View>
        <TouchableOpacity
          onPress={() => navigation.navigate("TicketConfirmation")}
          style={styles.continueButton}
        >
          <Text style={styles.continueButtonText}>Continue</Text>
        </TouchableOpacity>
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
  listContent: {
    paddingHorizontal: 16,
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 16,
    marginVertical: 8,
    borderRadius: 8,
  },
  itemImage: {
    width: 60,
    height: 80,
    borderRadius: 8,
  },
  itemDetails: {
    flex: 1,
    marginLeft: 16,
  },
  itemName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  itemPrice: {
    fontSize: 16,
    color: "#333",
    marginVertical: 8,
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  quantityButton: {
    width: 32,
    height: 32,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ddd",
    borderRadius: 4,
  },
  quantityButtonText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  quantityText: {
    marginHorizontal: 16,
    fontSize: 16,
  },
  footer: {
    flexDirection: "column",
    padding: 16,
    backgroundColor: "#f0f0f0",
  },
  totalContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 4,
    marginBottom: 8,
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: "bold",
  },
  totalPrice: {
    fontSize: 20,
    fontWeight: "bold",
    color: "red",
  },
  continueButton: {
    alignItems: "center",
    backgroundColor: "brown",
    padding: 12,
    borderRadius: 8,
    marginHorizontal: 24,
  },
  continueButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default ProductScreen;
