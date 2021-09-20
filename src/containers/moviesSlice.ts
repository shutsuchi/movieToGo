import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { getMovie, getMovies, getMoviesByGenre } from '../api/movies';
import { Movie, MovieResponse } from "../models/moviesModel";
import { AppThunk } from '../store'

interface MovieState {
  movie: Movie | null,
  movies: Movie[],
  moviesByGenre: Movie[],
  isLoading: boolean,
}

const initialState: MovieState = {
  movie: null,
  movies: [],
  moviesByGenre: [],
  isLoading: false,
}

const moviesSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    setMovie: (state, action: PayloadAction<MovieResponse>) => {
      state.movies = { ...state.movies, ...action.payload }

      return state
    },
    setMovies: (state, action: PayloadAction<{ movies: MovieResponse[] }>) => {
      const { payload } = action

      if (payload.movies) {
        state.movies = payload.movies.map((movie) => {
          return {
            ...movie,
            genres: Object.values(movie.genres)
          }
        })
      }

      return state
    },
    setMoviesByGenre: (state, action: PayloadAction<{ movies: MovieResponse[] }>) => {
      const { payload } = action

      if (payload.movies) {
        state.moviesByGenre = payload.movies.map((movie) => {
          return {
            ...movie,
            genres: Object.values(movie.genres)
          }
        })
      }

      return state
    },
    requestStart: (state) => {
      state.isLoading = true
      return state
    },
    requestSuccess: (state) => {
      state.isLoading = false
      return state
    },
    requestFailure: (state) => {
      state.isLoading = false
      return state
    },
  }

})

export const {
  setMovies,
  setMoviesByGenre,
  requestStart,
  requestSuccess,
  requestFailure,
} = moviesSlice.actions
export const moviesReducer = moviesSlice.reducer

export const fetchMovie = (id: number): AppThunk => async (dispatch) => {
  dispatch(requestStart())
  getMovie(id)
    .then((response) => {
      dispatch(requestSuccess())
      dispatch(setMovies(response))
    })
    .catch((error) => {
      dispatch(requestFailure())
    })
}

export const fetchMovies = (): AppThunk => async (dispatch) => {
  dispatch(requestStart())
  getMovies()
    .then((response) => {
      dispatch(requestSuccess())
      dispatch(setMovies(response))
    })
    .catch((error) => {
      dispatch(requestFailure())
    })
}

export const fetchMoviesByGenre = (id: number): AppThunk => async (dispatch) => {
  dispatch(requestStart())
  getMoviesByGenre(id)
    .then((response) => {
      dispatch(requestSuccess())
      dispatch(setMoviesByGenre(response))
    })
    .catch((error) => {
      dispatch(requestFailure())
    })
}