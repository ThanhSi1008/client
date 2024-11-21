import React, { createContext, useState, useEffect } from "react";
import cinemaApi from "../cinemaApi";

export const MovieContext = createContext();

export const MovieProvider = ({ children }) => {
  const [movie, setMovie] = useState(null);
  const [loadingMovie, setLoadingMovie] = useState(false);
  const [errorMovie, setErrorMovie] = useState(null);

  const [reviews, setReviews] = useState([]);
  const [loadingReviews, setLoadingReviews] = useState(false);
  const [errorReviews, setErrorReviews] = useState(null);

  const fetchMovieById = async (id) => {
    try {
      setLoadingMovie(true);
      setErrorMovie(null);
      const response = await cinemaApi.get(`/movies/${id}`);
      setMovie(response.data);
    } catch (err) {
      console.error(
        "Fetch Movie by ID Error:",
        err.response ? err.response.data : err.message
      );
      setErrorMovie(err);
    } finally {
      setLoadingMovie(false);
    }
  };

  const resetMovie = () => {
    setMovie(null);
    setErrorMovie(null);
  };

  const fetchReviewsByMovieId = async (id) => {
    try {
      setLoadingReviews(true);
      setErrorReviews(null);
      const response = await cinemaApi.get(`/movies/${id}/reviews`);
      setReviews(response.data.reviews);
    } catch (err) {
      console.error(
        "Fetch Reviews by Movie ID Error:",
        err.response ? err.response.data : err.message
      );
      setErrorReviews(err);
    } finally {
      setLoadingReviews(false);
    }
  };

  const submitReview = async (movieId, userId, rating, reviewText) => {
    try {
      // Get the current date (month and year)
      const currentDate = new Date();
      const currentMonth = currentDate.getMonth() + 1; // JavaScript months are 0-indexed
      const currentYear = currentDate.getFullYear();

      // Prepare the review data
      const reviewData = {
        movie_id: movieId, // Required movie ID
        date: {
          month: currentMonth,
          year: currentYear,
        },
        reviews: [
          {
            user_id: userId, // User ID who is submitting the review
            rating: rating, // Rating for the movie
            comment: reviewText, // Comment text
            time: currentDate, // The time when the review is submitted
          },
        ],
      };

      // Make the API call to submit the review
      const response = await cinemaApi.post(
        `/movies/${movieId}/reviews`,
        reviewData
      );

      // If review submission is successful, display success message and update state
      if (response.status === 201) {
        Toast.show({
          type: "success",
          text1: "Review Submitted",
          text2: "Your review has been successfully submitted.",
        });
      }

      return { success: true, review: response.data.review };
    } catch (err) {
      console.error(
        "Submit Review Error:",
        err.response ? err.response.data : err.message
      );

      // Handle error if review submission fails
      Toast.show({
        type: "error",
        text1: "Review Submission Failed",
        text2: err.response ? err.response.data.message : err.message,
      });

      return { success: false, error: err.response?.data || err.message };
    }
  };

  return (
    <MovieContext.Provider
      value={{
        movie,
        reviews,
        loadingMovie,
        loadingReviews,
        errorMovie,
        errorReviews,
        fetchMovieById,
        fetchReviewsByMovieId,
        submitReview,
        resetMovie,
      }}
    >
      {children}
    </MovieContext.Provider>
  );
};
