import { Genre } from "./genres";

export interface MovieGenre {
  id: number
  movie_id: number
  genre_id: number
  genre: Genre
  created_at: string
  updated_at: string
}