import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { getGenre, getGenres } from '../api/genres';
import { Genre, GenreResponse } from '../models/genres';
import { AppThunk } from '../store'

interface GenreState {
  genre: Genre | null,
  genres: Genre[],
  isLoading: boolean,
}

const initialState: GenreState = {
  genre: null,
  genres: [],
  isLoading: false,
}

const genresSlice = createSlice({
  name: 'genres',
  initialState,
  reducers: {
    setGenre: (state, action: PayloadAction<GenreResponse>) => {
      state.genres = { ...state.genres, ...action.payload }

      return state
    },
    setGenres: (state, action: PayloadAction<{ genres: GenreResponse[] }>) => {
      const { payload } = action

      state.genres = payload.genres

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
  setGenres,
  requestStart,
  requestSuccess,
  requestFailure,
} = genresSlice.actions
export const genresReducer = genresSlice.reducer

export const fetchGenre = (id: number): AppThunk => async (dispatch) => {
  dispatch(requestStart())
  getGenre(id)
    .then((response) => {
      dispatch(requestSuccess())
      dispatch(setGenres(response))
    })
    .catch((error) => {
      dispatch(requestFailure())
    })
}

export const fetchGenres = (): AppThunk => async (dispatch) => {
  dispatch(requestStart())
  getGenres()
    .then((response) => {
      dispatch(requestSuccess())
      dispatch(setGenres(response))
    })
    .catch((error) => {
      dispatch(requestFailure())
    })
}