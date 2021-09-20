import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface PageMeta {
  title: string
  keyword: string
  description: string
}

const initialState: PageMeta = {
  title: 'MovieToGo',
  keyword: '',
  description: '',
}

const pageMetasSlice = createSlice({
  name: 'pageMetas',
  initialState,
  reducers: {
    setPageMeta: (state, action: PayloadAction<PageMeta>) => {
      state = action.payload
      return state
    },
  },
})

export const { setPageMeta } = pageMetasSlice.actions
export const pageMetasReducer = pageMetasSlice.reducer
