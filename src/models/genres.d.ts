export interface Genre {
  id: number
  genre_name: string
  created_at: string
  updated_at: string
}

export interface GenreResponse extends Genre, CommonResponse {}