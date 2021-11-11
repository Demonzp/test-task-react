import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { StateBaseSearch } from '../../types/store';
import { searchGifs } from '../actions/search';


const initialState: StateBaseSearch = {
  page: 1,
  limit: 20,
  pages: [],
  countPages: 0,
  isLoading: false,
  hasNextPage: false,
  search: '',
  force: false,
  countItems: 0
};

const sliceSearch = createSlice({
  name: 'search',
  initialState,
  reducers: {
    clearState(state) {
      state.page = 1;
      state.limit = 20;
      state.pages = [];
      state.countPages = 0;
      state.isLoading = false;
      state.hasNextPage = false;
      state.search = '';
      state.force = false;
    },
    setSearch(state, action: PayloadAction<string>){
      state.search = action.payload;
    },
    setForce(state, action: PayloadAction<boolean>){
      state.force = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(searchGifs.fulfilled, (state, { payload }) => {
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

      state.countItems = payload.pagination.total_count;

      state.isLoading = false;
      state.force = false;
    })
  }
});

export const { clearState, setSearch, setForce } = sliceSearch.actions;

export default sliceSearch;