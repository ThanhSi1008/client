import React, { createContext, useState, useEffect } from "react"
import cinemaApi from "../cinemaApi"

export const MoviesContext = createContext()

export const MoviesProvider = ({ children }) => {
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const fetchMovies = async () => {
    try {
      setLoading(true)
      setError(null)
      const response = await cinemaApi.get("/movies")
      setMovies(response.data)
    } catch (err) {
      console.error(
        "Fetch Featured Movies Error:",
        err.response ? err.response.data : err.message
      )
      setError(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <MoviesContext.Provider
      value={{
        movies,
        loading,
        error,
        fetchMovies
      }}
    >
      {children}
    </MoviesContext.Provider>
  )
}
