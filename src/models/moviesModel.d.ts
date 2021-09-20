import { CommonResponse } from "./commonModels";
import { MovieGenre } from "./movieGenresModel";

export interface Movie {
  id: number
  title: string
  description: string
  year: string
  release_date: string
  run_time: number
  rating: number
  mpaa_rating: string
  created_at: string
  updated_at: string
  genres: MovieGenre[]
}

export interface MovieResponse extends Movie, CommonResponse {}