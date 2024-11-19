import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  ScrollView,
  StyleSheet,
  Modal,
  TouchableWithoutFeedback
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { WebView } from "react-native-webview";
import { MovieContext } from "../contexts/MovieContext";
import Loading from "../components/Loading"
import { SafeAreaView } from "react-native-safe-area-context";
import { FontAwesome } from "@expo/vector-icons"; // Sử dụng icon ngôi sao


const MovieInfoScreen = ({ route, navigation }) => {
  const { movieId } = route.params;
  const {
    movie,
    reviews,
    loadingMovie,
    loadingReviews,
    errorMovie,
    errorReviews,
    fetchMovieById,
    fetchReviewsByMovieId,
    resetMovie,
  } = useContext(MovieContext);
  const [isModalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    if (movieId) {
      fetchMovieById(movieId);
      fetchReviewsByMovieId(movieId);
    }
  }, [movieId]);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  if (loadingMovie || loadingReviews) return <Loading />
  if (errorMovie || errorReviews) return <Text>Error loading movie details.</Text>;

  function formatNumber(num) {
    if (num >= 1000) {
      const suffixes = ['k', 'M', 'B', 'T']; // You can extend this as needed
      const magnitude = Math.floor(Math.log10(num) / 3);
      const formattedNum = (num / Math.pow(1000, magnitude)).toFixed(1); // One decimal place
      return formattedNum + suffixes[magnitude - 1];
    }
    return num.toString(); // Return as-is if less than 1000
  }

  return (
    ( movie && 
    <SafeAreaView style={styles.container}>
      <View style={styles.subContainer}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color="black" />
          </TouchableOpacity>
          <Text style={styles.headerText}>Movie Info</Text>
        </View>

        <ScrollView
          style={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.movieInfo}>
            <Image
              style={styles.poster}
              source={{
                uri: movie.movie_poster,
              }}
            />
            <View style={styles.movieDetails}>
              <Text style={styles.movieTitle}>
                {movie.movie_name}
              </Text>
              <Text style={styles.genre}>{movie.genre}</Text>
              <Text style={styles.detail}>
                Release Date:{" "}
                {new Date(movie.release_date).toDateString()}
              </Text>
              <Text style={styles.detail}>
                Duration: {movie.duration} minutes
              </Text>
              <Text style={styles.detail}>
                Language: {movie.language}
              </Text>
              <View style={{ flexDirection: "row", alignItems: "center", gap: 4 }}>
                <FontAwesome name="star" size={16} color="#FFD700" />
                <Text>{movie.rating.avg_rating.$numberDecimal}/10</Text>
                <Text>({formatNumber(movie.rating.number_of_rating)} Ratings)</Text>
              </View>
              <TouchableOpacity
                style={styles.trailerButton}
                onPress={toggleModal}
              >
                <Text style={styles.trailerButtonText}>▶ Trailer</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Overview</Text>
            <Text style={styles.overviewText}>
              {movie.description}
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Casts</Text>
            <FlatList
              horizontal
              data={movie.casts}
              keyExtractor={(item, index) => item.person_id || `${index}`}
              renderItem={({ item }) => (
                <View style={styles.castItem}>
                  <Image
                    style={styles.castImage}
                    source={{ uri: item.avatar }}
                  />
                  <Text style={styles.castName}>{item.person_name}</Text>
                  <Text style={styles.castRole}>{item.character_name}</Text>
                </View>
              )}
              showsHorizontalScrollIndicator={false}
            />
          </View>

          <View style={{ gap: 8 }}>
            <Text style={{ fontSize: 18, fontWeight: "bold" }}>Review</Text>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <View style={{ flexDirection: "row", alignItems: "center", gap: 4 }}>
                <FontAwesome name="star" size={16} color="#FFD700" />
                <Text>{movie.rating.avg_rating.$numberDecimal}/10</Text>
                <Text>({formatNumber(movie.rating.number_of_rating)} Ratings)</Text>
              </View>
              <TouchableOpacity>
                <Text style={{ color: "#b22222", fontWeight: "bold" }}>
                  Write a review
                </Text>
              </TouchableOpacity>
            </View>

            <FlatList
              contentContainerStyle={{ gap: 6 }}
              scrollEnabled={false}
              data={reviews}
              keyExtractor={(item, index) => `${index}`}
              renderItem={({ item }) => (
                <View
                  style={{
                    backgroundColor: "#eee",
                    padding: 12,
                    borderRadius: 8,
                    gap: 8,
                  }}
                >
                  <Text style={{ padding: 0, fontWeight: "bold" }}>
                    {item.user.full_name}
                  </Text>
                  <Text style={{ fontSize: 12 }}>
                    ⭐ {item.rating}/10 - Masterpiece
                  </Text>
                  <Text style={{ fontSize: 12 }}>{item.comment}</Text>
                </View>
              )}
            />
          </View>
        </ScrollView>

        <Modal
          visible={isModalVisible}
          onRequestClose={toggleModal}
          animationType="slide"
          transparent={true}
        >
          <TouchableWithoutFeedback
          // onPress={toggleModal}
          >
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                <TouchableOpacity
                  style={styles.closeButton}
                  onPress={toggleModal}
                >
                  <Ionicons name="close" size={40} color="white" />
                </TouchableOpacity>
                <WebView
                  source={{ uri: movie.trailer_link }}
                  style={styles.webviewPlayer}
                />
              </View>
            </View>
          </TouchableWithoutFeedback>
        </Modal>
        <TouchableOpacity
          style={styles.getTicketsButton}
          onPress={() => navigation.navigate("ShowTimes")}
        >
          <Text style={styles.getTicketsText}>Get Tickets</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>)
    
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  subContainer: {
    flex: 1,
    margin: 16,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  headerText: {
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: 8,
  },
  scrollContainer: {
    flexGrow: 1,
  },
  movieInfo: {
    flexDirection: "row",
    marginBottom: 16,
  },
  poster: {
    width: 120,
    height: 160,
    borderRadius: 8,
  },
  movieDetails: {
    marginLeft: 16,
    flex: 1,
    gap: 2,
  },
  movieTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  genre: {
    fontSize: 14,
    color: "#666",
  },
  detail: {
    fontSize: 14,
    color: "#333",
  },
  trailerButton: {
    backgroundColor: "#b71c1c",
    alignItems: "center",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 4,
    marginTop: 8,
    // marginRight: 100,
    alignSelf: "flex-start",
  },
  trailerButtonText: {
    color: "#fff",
  },
  section: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  overviewText: {
    fontSize: 14,
    color: "#333",
  },
  castItem: {
    alignItems: "center",
    marginRight: 16,
    gap: 4,
  },
  castImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  castName: {
    fontSize: 12,
    fontWeight: "bold",
  },
  castRole: {
    fontSize: 10,
    color: "#666",
  },
  getTicketsButton: {
    backgroundColor: "#b71c1c",
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 16,
  },
  getTicketsText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: "90%",
    height: "70%",
    backgroundColor: "black",
    borderRadius: 10,
    overflow: "hidden",
  },
  closeButton: {
    position: "absolute",
    top: 10,
    right: 10,
    zIndex: 1,
  },
  webviewPlayer: {
    flex: 1,
  },
});

export default MovieInfoScreen;
