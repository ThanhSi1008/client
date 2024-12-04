import React, { useContext, useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  Image,
  FlatList,
  View,
  TouchableOpacity,
} from "react-native";
import Header from "../components/Header";
import MovieCard from "../components/MovieCard";
import { MoviesContext } from "../contexts/MoviesContext";
import { SafeAreaView } from "react-native-safe-area-context";
import Loading from "../components/Loading"

const HomeScreen = ({ navigation }) => {
  const { movies, loading, error, fetchMovies } = useContext(MoviesContext);

  useEffect(() => {
    fetchMovies()
  }, [])

  const renderMovieCard = ({ item }) => (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate("MovieInfo", { movieId: item._id || item.id })
      }
    >
      <MovieCard movie={item} />
    </TouchableOpacity>
  );

  const sections = [
    { title: "Featured Movies", data: movies.slice(0, 3)},
    { title: "Top Movies Currently in Theaters", data: movies.slice(3) },
  ];

  const [searchQuery, setSearchQuery] = useState("");
  const [filteredMovies, setFilteredMovies] = useState([]);

  const handleSearchChange = (text) => {
    setSearchQuery(text)

    const allMovies = movies

    const result = allMovies.filter(
      (movie) =>
        movie.movie_name &&
        typeof movie.movie_name === "string" &&
        movie.movie_name.toLowerCase().includes(text.toLowerCase())
    );

    setFilteredMovies(result);
  };

  const isSearchActive = searchQuery.length > 0;

  if (loading) return <Loading />

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Error: {error.message}</Text>
      </View>
    );
  }

  if (isSearchActive) {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.container}>
          <Header
            searchQuery={searchQuery}
            onSearchChange={handleSearchChange}
          />

          <FlatList
            data={filteredMovies}
            keyExtractor={(item, index) => `${index}`}
            renderItem={({ item }) => (
              <View style={styles.movieItem}>
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate("MovieInfo", {
                      movieId: item._id || item.id,
                    })
                  }
                >
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      marginHorizontal: 12,
                    }}
                  >
                    <Image
                      source={{ uri: item.movie_poster }}
                      style={{ width: "28%", height: 120 }}
                    />
                    <View style={{ justifyContent: "space-evenly" }}>
                      <Text>{item.movie_name}</Text>
                      <Text>{new Date(item.release_date).toDateString()}</Text>
                    </View>
                  </View>
                </TouchableOpacity>
              </View>
            )}
            style={{ flex: 1 }}
          />
        </View>
      </SafeAreaView>
    );
  } else {
    return (
      <SafeAreaView style={styles.container}>
        <Header searchQuery={searchQuery} onSearchChange={handleSearchChange} />
        <FlatList
          data={sections}
          keyExtractor={(item) => item.title}
          renderItem={({ item }) => (
            <View>
              <Text style={styles.sectionTitle}>{item.title}</Text>
              <FlatList
                data={item.data}
                renderItem={renderMovieCard}
                keyExtractor={(movie) => movie._id || movie.id}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.flatList}
              />
            </View>
          )}
        />
      </SafeAreaView>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f8f8",
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginVertical: 10,
    marginLeft: 16,
    color: "#333",
  },
  flatList: {
    paddingLeft: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    fontSize: 16,
    color: "red",
  },
  movieItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  movieList: {
    marginTop: 10,
  },
});

export default HomeScreen;
