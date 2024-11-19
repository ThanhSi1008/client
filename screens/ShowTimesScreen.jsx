import React, { useState } from "react";
import { Text, View, FlatList, TouchableOpacity, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";

const dates = [
  { day: "15/11", label: "FRI" },
  { day: "16/11", label: "SAT" },
  { day: "17/11", label: "SUN" },
  { day: "18/11", label: "MON" },
  { day: "19/11", label: "TUE" },
  { day: "20/11", label: "WED" },
  { day: "21/11", label: "THU" },
];

const showtimes = [
  { cinema: "Cosmos 1", address: "6925 Hollywood Blvd, Hollywood, CA 90028", times: ["17:00 ~ 18:49", "19:15 ~ 21:04"] },
  { cinema: "Cosmos 2", address: "6925 Hollywood Blvd, Hollywood, CA 90028", times: ["17:00 ~ 18:49", "19:15 ~ 21:04"] },
  { cinema: "Cosmos 3", address: "6925 Hollywood Blvd, Hollywood, CA 90028", times: ["17:00 ~ 18:49", "19:15 ~ 21:04"] },
  { cinema: "Cosmos 4", address: "6925 Hollywood Blvd, Hollywood, CA 90028", times: ["17:00 ~ 18:49", "19:15 ~ 21:04"] },
];

const ShowTimesScreen = ({ navigation }) => {
  const [selectedDate, setSelectedDate] = useState("15/11");

  return (
    <SafeAreaView style={{ backgroundColor: "#f8f8f8"}}>
      <View style={{ flexDirection: "row", alignItems: "center", padding: 16 }}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={{ fontSize: 20, fontWeight: "bold", marginLeft: 8 }}>Venom: The Last Dance</Text>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 8 }}>
        {dates.map((date) => (
          <TouchableOpacity key={date.day} style={{ alignItems: "center", padding: 10, borderRadius: 8, marginHorizontal: 4, backgroundColor: selectedDate === date.day ? "#b71c1c" : "#e0e0e0" }} onPress={() => setSelectedDate(date.day)}>
            <Text style={{ fontSize: 16, fontWeight: "bold", color: selectedDate === date.day ? "#fff" : "#333" }}>{date.day}</Text>
            <Text style={{ fontSize: 12, color: selectedDate === date.day ? "#fff" : "#333" }}>{date.label}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <FlatList
        data={showtimes}
        keyExtractor={(item) => item.cinema}
        renderItem={({ item }) => (
          <View style={{ backgroundColor: "#f0f0f0", marginVertical: 8, padding: 16, borderRadius: 10, marginHorizontal: 16 }}>
            <Text style={{ fontSize: 18, fontWeight: "bold", color: "#333" }}>{item.cinema}</Text>
            <Text style={{ fontSize: 14, color: "#888", marginVertical: 4 }}>{item.address}</Text>
            <View style={{ flexDirection: "row", marginTop: 8 }}>
              {item.times.map((time, index) => (
                <View key={index} style={{ backgroundColor: "#e0e0e0", paddingVertical: 6, paddingHorizontal: 12, borderRadius: 8, marginRight: 8 }}>
                  <TouchableOpacity onPress={() => navigation.navigate("SeatSelection")}>
                    <Text style={{ fontSize: 16, fontWeight: "bold", color: "#333" }}>{time}</Text>
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          </View>
        )}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

export default ShowTimesScreen;
