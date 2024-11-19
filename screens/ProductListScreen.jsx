import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";
import cinemaApi from "../cinemaApi"

const ProductListScreen = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Lấy dữ liệu từ API khi màn hình được load
  useEffect(() => {
    cinemaApi
      .get("/product/products") // API để lấy danh sách sản phẩm
      .then((response) => {
        setProducts(response.data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  // Hiển thị một item trong FlatList
  const renderItem = ({ item }) => (
    <View style={styles.productItem}>
      <Image
        source={{ uri: item.image }} // Thay thế 'image' bằng trường ảnh của sản phẩm
        style={styles.productImage}
      />
      <View style={styles.productInfo}>
        <Text style={styles.productName}>{item.name}</Text>
        <Text style={styles.productCategory}>Category: {item.category}</Text>
        <Text style={styles.productFlavor}>Flavor: {item.flavor}</Text>
        <Text style={styles.productSize}>Size: {item.size}</Text>
        <Text style={styles.productVolume}>Volume: {item.volume}</Text>
        <Text style={styles.productAvailable}>
          {item.available ? "Available" : "Out of Stock"}
        </Text>
      </View>
    </View>
  );

  // Render loading hoặc error message nếu cần
  if (loading) {
    return (
      <View style={styles.center}>
        <Text>Loading...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text>Error: {error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={products}
        renderItem={renderItem}
        keyExtractor={(item) => item._id} // Giả sử mỗi sản phẩm có trường _id
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: "#f7f7f7",
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  productItem: {
    flexDirection: "row",
    padding: 10,
    marginBottom: 10,
    backgroundColor: "#fff",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  productImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 10,
  },
  productInfo: {
    flex: 1,
  },
  productName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  productCategory: {
    color: "#777",
  },
  productFlavor: {
    color: "#777",
  },
  productSize: {
    color: "#777",
  },
  productVolume: {
    color: "#777",
  },
  productAvailable: {
    color: "#28a745",
    fontWeight: "bold",
  },
});

export default ProductListScreen;
