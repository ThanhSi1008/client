import React, { useState, useContext } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  Alert,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import Toast from "react-native-toast-message";
import { MovieContext } from "../contexts/MovieContext";
import { AuthContext } from "../contexts/AuthContext";

const ReviewScreen = ({ navigation, route }) => {
  const { submitReview } = useContext(MovieContext);
  const { userId } = useContext(AuthContext);
  const { movie } = route.params; // Movie data passed via route params
  const [rating, setRating] = useState(0); // Default rating
  const [reviewText, setReviewText] = useState("");

  const handleRating = (selectedRating) => {
    setRating(selectedRating);
  };

  const handleSubmitReview = async () => {
    console.log(userId);
    if (!rating || !reviewText.trim()) {
      Toast.show({
        type: "error",
        text1: "Incomplete Review",
        text2: "Please provide a rating and a review text.",
      });
      return;
    }

    const result = await submitReview(movie._id, userId, rating, reviewText);
    console.log(result);
    if (result.success) {
      console.log(movie._id);
      setTimeout(() => {
        Toast.show({
          type: "success",
          text1: "Review Submitted",
          text2: "Your review has been successfully submitted.",
        });

        // Go back to the previous screen
        navigation.goBack();
      }, 500);
    } else {
      Toast.show({
        type: "error",
        text1: "Failed",
        text2: "Failed to submit your review.",
      });
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, padding: 20, backgroundColor: "#fff" }}>
      {/* Header Section */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginBottom: 16,
        }}
      >
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={{ marginLeft: 6, fontSize: 24, fontWeight: "bold" }}>
          Write A Review
        </Text>
      </View>

      {/* Main Content */}
      <ScrollView>
        {/* Movie Details */}
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginBottom: 20,
          }}
        >
          <Image
            source={{ uri: movie.movie_poster }} // Movie poster URL
            style={{ width: 50, height: 70, marginRight: 10 }}
          />
          <Text style={{ fontSize: 18, fontWeight: "bold" }}>
            {movie.movie_name}
          </Text>
        </View>

        {/* Rating Section */}
        <Text style={{ marginBottom: 10, fontSize: 16 }}>
          Press to leave a rating
        </Text>
        <View style={{ flexDirection: "row", marginBottom: 20 }}>
          {Array.from({ length: 10 }).map((_, index) => (
            <TouchableOpacity
              activeOpacity={1}
              key={index}
              onPress={() => handleRating(index + 1)}
            >
              <FontAwesome
                name={index < rating ? "star" : "star-o"}
                size={25}
                color={index < rating ? "#fdd835" : "#ccc"}
              />
            </TouchableOpacity>
          ))}
        </View>

        {/* Review Text Section */}
        <Text style={{ marginBottom: 10, fontSize: 16 }}>
          Your thoughts about the movie
        </Text>
        <TextInput
          style={{
            borderWidth: 1,
            borderColor: "#ccc",
            borderRadius: 5,
            padding: 10,
            height: 100,
            textAlignVertical: "top",
            marginBottom: 20,
            fontSize: 14,
          }}
          placeholder="Share your thoughts ..."
          placeholderTextColor="#aaa"
          multiline
          value={reviewText}
          onChangeText={setReviewText}
        />
      </ScrollView>

      {/* Submit Button */}
      <TouchableOpacity
        style={{
          backgroundColor: "#d32f2f",
          paddingVertical: 15,
          borderRadius: 5,
          alignItems: "center",
        }}
        onPress={handleSubmitReview}
      >
        <Text style={{ color: "#fff", fontSize: 16, fontWeight: "bold" }}>
          Send your review
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default ReviewScreen;
