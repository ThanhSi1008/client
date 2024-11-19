import React, { createContext, useState, useEffect } from "react"
import cinemaApi from "../cinemaApi"

export const MovieContext = createContext()

export const MovieProvider = ({ children }) => {
  const [movie, setMovie] = useState(null)
  const [loadingMovie, setLoadingMovie] = useState(false)
  const [errorMovie, setErrorMovie] = useState(null)

  const [reviews, setReviews] = useState([])
  const [loadingReviews, setLoadingReviews] = useState(false)
  const [errorReviews, setErrorReviews] = useState(null)

  const fetchMovieById = async (id) => {
    try {
      setLoadingMovie(true)
      setErrorMovie(null)
      const response = await cinemaApi.get(`/movies/${id}`)
      setMovie(response.data)
    } catch (err) {
      console.error(
        "Fetch Movie by ID Error:",
        err.response ? err.response.data : err.message
      )
      setErrorMovie(err)
    } finally {
      setLoadingMovie(false)
    }
  }

  const resetMovie = () => {
    setMovie(null)
    setErrorMovie(null)
  }

  const fetchReviewsByMovieId = async (id) => {
    try {
      setLoadingReviews(true)
      setErrorReviews(null)
      const response = await cinemaApi.get(`/movies/${id}/reviews`)
      setReviews(response.data.reviews)
    } catch (err) {
      console.error(
        "Fetch Reviews by Movie ID Error:",
        err.response ? err.response.data : err.message
      )
      setErrorReviews(err)
    } finally {
      setLoadingReviews(false)
    }
  }

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
        resetMovie,
      }}
    >
      {children}
    </MovieContext.Provider>
  )
}
