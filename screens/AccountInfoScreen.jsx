import React from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";

const AccountInfoScreen = () => {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginTop: 24,
          marginLeft: 8
        }}
      >
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={{ marginLeft: 6, fontSize: 24, fontWeight: "bold" }}>
          Account Information
        </Text>
      </View>
      <ScrollView style={{ flex: 1, padding: 16 }}>
        <View
          style={{
            marginBottom: 20,
            marginTop: 8,
            borderBottomWidth: 1,
            borderBottomColor: "#ddd",
            paddingBottom: 10,
          }}
        >
          <Text style={{ fontSize: 16, color: "#555", marginBottom: 5 }}>
            Full Name
          </Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Text style={{ fontSize: 16, color: "#333" }}>John Doe</Text>
            <TouchableOpacity>
              <Icon name="pencil-outline" size={20} color="#888" />
            </TouchableOpacity>
          </View>
        </View>

        <View
          style={{
            marginBottom: 20,
            borderBottomWidth: 1,
            borderBottomColor: "#ddd",
            paddingBottom: 10,
          }}
        >
          <Text style={{ fontSize: 16, color: "#555", marginBottom: 5 }}>
            Email
          </Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Text style={{ fontSize: 16, color: "#333" }}>
              johndoe@example.com
            </Text>
            <TouchableOpacity>
              <Icon name="pencil-outline" size={20} color="#888" />
            </TouchableOpacity>
          </View>
        </View>

        <View
          style={{
            marginBottom: 20,
            borderBottomWidth: 1,
            borderBottomColor: "#ddd",
            paddingBottom: 10,
          }}
        >
          <Text style={{ fontSize: 16, color: "#555", marginBottom: 5 }}>
            Phone Number
          </Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Text style={{ fontSize: 16, color: "#333" }}>+1 123 456 7890</Text>
            <TouchableOpacity>
              <Icon name="pencil-outline" size={20} color="#888" />
            </TouchableOpacity>
          </View>
        </View>

        <View
          style={{
            marginBottom: 20,
            borderBottomWidth: 1,
            borderBottomColor: "#ddd",
            paddingBottom: 10,
          }}
        >
          <Text style={{ fontSize: 16, color: "#555", marginBottom: 5 }}>
            Address
          </Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Text style={{ fontSize: 16, color: "#333" }}>
              123 Hollywood Blvd, CA
            </Text>
            <TouchableOpacity>
              <Icon name="pencil-outline" size={20} color="#888" />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AccountInfoScreen;
