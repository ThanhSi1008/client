import React, { useState, useEffect } from 'react';
import { View, FlatList, Text, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import cinemaApi from "../cinemaApi"

const MoviesScreen = ({ navigation }) => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    cinemaApi.get('/api/movies')
      .then((response) => {
        setMovies(response.data.movies || response.data); // Kiểm tra cấu trúc của response
        setLoading(false);
      })
      .catch((error) => {
        setError('Could not load movies');
        setLoading(false);
      });
  }, []);

  const renderMovieItem = ({ item }) => (
    <TouchableOpacity
      style={styles.movieItem}
      onPress={() => navigation.navigate('MovieDetails', { movieId: item._id })}
    >
      <Text style={styles.movieTitle}>{item.movie_name}</Text>
      <Text style={styles.movieDuration}>{item.duration} min</Text>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {movies.length > 0 ? (
        <FlatList
          data={movies}
          keyExtractor={(item) => item._id.toString()}
          renderItem={renderMovieItem}
        />
      ) : (
        <Text>No movies available</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  movieItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  movieTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  movieDuration: {
    fontSize: 14,
    color: '#555',
  },
});

export default MoviesScreen;
