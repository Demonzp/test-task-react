import { createSlice } from '@reduxjs/toolkit';
import { StateBase } from '../../types/store';
import { delFromFavorites, getFavorites } from '../actions/favorites';

const initialState: StateBase = {
  page: 1,
  limit: 20,
  pages: [],
  countPages: 0,
  isLoading: false,
  hasNextPage: false,
  countItems: 0
};


const sliceFavorites = createSlice({
  name: 'favorites',
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
    builder
      .addCase(getFavorites.fulfilled, (state, { payload }) => {
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

      .addCase(delFromFavorites.fulfilled, (state) => {
        state.page = 1;
        state.pages = [];
        state.countPages = 0;
        state.isLoading = false;
        state.hasNextPage = false;
      })
  }
});

export const { clearState } = sliceFavorites.actions;

export default sliceFavorites;