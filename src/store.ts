import {
  combineReducers,
  configureStore,
  Action,
} from '@reduxjs/toolkit'
import { ThunkAction } from 'redux-thunk'
import logger from 'redux-logger'
import { routerMiddleware, connectRouter } from 'connected-react-router'
import { history } from './history'
import { pageMetasReducer } from './containers/pageMetasSlice'
import { moviesReducer } from './containers/moviesSlice'
import { genresReducer } from './containers/genresSlice'

const rootReducer = combineReducers({
  router: connectRouter(history),
  pageMetas: pageMetasReducer,
  movies: moviesReducer,
  genres: genresReducer,
})

export type AppThunk = ThunkAction<void, RootState, null, Action<string>>

export type RootState = ReturnType<typeof rootReducer>

export const setupStore = () => {
  const isDevelopment = process.env.NODE_ENV !== 'production'
  const middlewares = [routerMiddleware(history)]

  if (!process.env.DISABLE_STORE_LOG && isDevelopment) {
    middlewares.push(logger)
  }

  const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>  [
      ...getDefaultMiddleware().concat(logger),
      ...middlewares
    ],
    devTools: isDevelopment,
  })

  return store
}