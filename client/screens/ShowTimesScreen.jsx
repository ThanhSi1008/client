import React, { useContext, useState, useEffect } from "react";
import { Text, View, FlatList, TouchableOpacity, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import ScreeningContext from "../contexts/ScreeningContext"
import cinemaApi from "../cinemaApi"
import { AuthContext } from "../contexts/AuthContext"
import Loading from "../components/Loading"
import { MovieContext } from "../contexts/MovieContext"

function generateDatesArray(numDays) {
  const daysOfWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
  const currentDate = new Date();
  const dates = [];

  for (let i = 0; i < numDays; i++) {
    const date = new Date(currentDate);
    date.setDate(currentDate.getDate() + i);

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const dayOfWeek = daysOfWeek[date.getDay()];

    const formattedDate = `${year}-${month}-${day}`;

    dates.push({ day: `${day}/${month}`, label: dayOfWeek, year, formattedDate });
  }

  return dates;
}

function formatTime(dateString) {
  const date = new Date(dateString);
  if (isNaN(date)) {
    throw new Error("Invalid date string");
  }
  const hours = String(date.getUTCHours()).padStart(2, "0");
  const minutes = String(date.getUTCMinutes()).padStart(2, "0");
  return `${hours}:${minutes}`;
}

const dates = generateDatesArray(7);

const ShowTimesScreen = ({ navigation }) => {
  const { currentUser } = useContext(AuthContext)
  const { movie } = useContext(MovieContext)
  const [selectedDate, setSelectedDate] = useState(dates.at(0));
  const { screenings, dispatchScreenings} = useContext(ScreeningContext)

  useEffect(() => {
    async function fetchScreenings() {
      try {
        dispatchScreenings({type: "FETCH_SCREENINGS_PENDING"})
        const response = await cinemaApi.get(`/screenings?date=${selectedDate.formattedDate}&movie_id=${movie._id}`, { headers: { Authorization: `Bearer ${currentUser.token}` }})
        dispatchScreenings({type: "FETCH_SCREENINGS_SUCCESS", payload: response.data})
        console.log(response.data)
      } catch (error) {
        dispatchScreenings({type: "FETCH_SCREENINGS_FAILURE", error})
      }
    }
    fetchScreenings()
  }, [selectedDate])

  function handleDateChanged(date) {
    setSelectedDate(date)
  }

  function handleScreeningPressed(screening, theater) {
    dispatchScreenings({ type: "SET_SCREENING", payload: screening})
    dispatchScreenings({ type: "SET_THEATER", payload: theater})
    navigation.navigate("SeatSelection", { theater_name: theater.theater_name })
  }

  if (screenings)
  return (
    <SafeAreaView>
      <View style={{ flexDirection: "row", alignItems: "center", padding: 16 }}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={{ fontSize: 20, fontWeight: "bold", marginLeft: 8 }}>Venom: The Last Dance</Text>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 8 }}>
        {dates.map((date) => (
          <TouchableOpacity key={date.day} style={{ alignItems: "center", padding: 10, borderRadius: 8, marginHorizontal: 4, backgroundColor: selectedDate.day === date.day ? "#b71c1c" : "#e0e0e0" }} onPress={() => handleDateChanged(date)}>
            <Text style={{ fontSize: 16, fontWeight: "bold", color: selectedDate.day === date.day ? "#fff" : "#333" }}>{date.day}</Text>
            <Text style={{ fontSize: 12, color: selectedDate.day === date.day ? "#fff" : "#333" }}>{date.label}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      { screenings.isLoading ? <View style={{ paddingVertical: 256}}><Loading/></View> : 
        !screenings || !screenings.screenings || screenings.screenings.length === 0 ? 
            (
              <Text style={{ marginVertical: 16, marginHorizontal: 16 }}>There is nothing here</Text>
            ) : 
            (
              <FlatList
              data={screenings.screenings}
              keyExtractor={(item) => item.theater_name}
              renderItem={({ item: screeningTheater }) => (
                <View style={{ backgroundColor: "#f0f0f0", marginVertical: 8, padding: 16, borderRadius: 10, marginHorizontal: 16 }}>
                  <Text style={{ fontSize: 18, fontWeight: "bold", color: "#333" }}>{screeningTheater.theater_name}</Text>
                  <Text style={{ fontSize: 14, color: "#888", marginVertical: 4 }}>{`${screeningTheater.address.street}, ${screeningTheater.address.city}, ${screeningTheater.address.state} ${screeningTheater.address.country}`}</Text>
                  <View style={{ flexDirection: "row", marginTop: 8 }}>
                    {screeningTheater.screenings.map((screening, index) => (
                      <View key={index} style={{ backgroundColor: "#e0e0e0", paddingVertical: 6, paddingHorizontal: 12, borderRadius: 8, marginRight: 8 }}>
                        <TouchableOpacity onPress={() => handleScreeningPressed(screening, {theater_name: screeningTheater.theater_name, address: screeningTheater.address})}>
                          <Text style={{ fontSize: 16, fontWeight: "bold", color: "#333" }}>{`${formatTime(screening.screening_time)} - ${formatTime(screening.end_time)}`}</Text>
                        </TouchableOpacity>
                      </View>
                    ))}
                  </View>
                </View>
            )}
            showsVerticalScrollIndicator={false}
        />
      )}

    </SafeAreaView>
  );
};

export default ShowTimesScreen;
