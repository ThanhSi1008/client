import React, { useRef, useEffect } from "react";
import { View, TextInput, StyleSheet, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";

const Header = ({ searchQuery, onSearchChange }) => {
  const searchInputRef = useRef(null);
  const navigation = useNavigation();

  useEffect(() => {
    if (searchQuery.length > 0) {
      searchInputRef.current.focus();
    }
  }, [searchQuery]);

  return (
    <View style={styles.header}>
      <View style={styles.searchContainer}>
        <Icon name="search" size={30} color="#888" />
        <TextInput
          ref={searchInputRef}
          placeholder="Search by movie names"
          style={styles.searchInput}
          value={searchQuery}
          onChangeText={onSearchChange}
          autoFocus={searchQuery.length > 0}
        />
      </View>
      <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
        <Icon name="person-circle" size={40} color="#888" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
    backgroundColor: "#fff",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
    borderRadius: 8,
    paddingHorizontal: 10,
    flex: 1,
    marginHorizontal: 10,
  },
  searchInput: {
    flex: 1,
    marginLeft: 5,
    padding: 10,
  },
});

export default Header;