import { MovieResponse } from "../models/moviesModel"
import ApiClient from "./apiClient"

export const getMovie = async (id: number) => {
  return await ApiClient.get(
    `/movies/${id}`,
    (response: MovieResponse[]) => response
  )
}

export const getMovies = async () => {
  return await ApiClient.get(
    '/movies',
    (response: MovieResponse[]) => response
  )
}

export const getMoviesByGenre = async (id: number) => {
  return await ApiClient.get(
    `/genres/${id}`,
    (response: MovieResponse[]) => response
  )
}