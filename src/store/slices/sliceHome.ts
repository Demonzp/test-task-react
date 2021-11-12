import { createSlice } from '@reduxjs/toolkit';
import { StateBase } from '../../types/store';
import { fetchGifs } from '../actions/home';


const initialState: StateBase = {
  page: 1,
  limit: 20,
  pages: [],
  countPages: 0,
  isLoading: false,
  hasNextPage: false,
  countItems: 0,
};

const sliceHome = createSlice({
  name: 'home',
  initialState,
  reducers: {
    clearState(state) {
      state.page = 1;
      state.limit = 20;
      state.pages = [];
      state.countPages = 0;
      state.isLoading = false;
      state.hasNextPage = false;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchGifs.fulfilled, (state, { payload }) => {
      state.countPages = payload.pagination.pages;
      const hasNextPage = payload.pagination.page < payload.pagination.pages;
      if (hasNextPage) {
        state.page += 1;
      } else {
        state.page = payload.pagination.pages;
      }
      state.hasNextPage = hasNextPage;
      state.pages.push({
        id: payload.pagination.offset,
        gifs: payload.data
      });

      state.isLoading = false;
    })
  }
});

export const { clearState } = sliceHome.actions;

export default sliceHome;