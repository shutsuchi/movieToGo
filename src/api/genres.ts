import { GenreResponse } from "../models/genres"
import ApiClient from "./apiClient"

export const getGenre = async (id: number) => {
  return await ApiClient.get(
    `/genres/${id}`,
    (response: GenreResponse[]) => response
  )
}

export const getGenres = async () => {
  return await ApiClient.get(
    '/genres',
    (response: GenreResponse[]) => response
  )
}