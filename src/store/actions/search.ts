import { createAsyncThunk } from '@reduxjs/toolkit';
import { searchGifsReq } from '../../services/fetchGifs';
import { IResSearchGifs } from '../../types/serverData';
import { clearState, setForce, setSearch } from '../slices/sliceSearch';
import { AppDispatch, RootState } from '../store';

export const searchGifs = createAsyncThunk<IResSearchGifs, void, {state: RootState}>(
  'search/searchGifs',
  async (_, {getState}) => {
    try {
      const data = await searchGifsReq(getState().search.search, getState().search.page, getState().search.limit);
      return data;
    } catch (error) {
      throw error;
    }

  }
);

export const setSearchGlobal = createAsyncThunk<void, string, {state: RootState, dispatch: AppDispatch}>(
  'search/setSearchGlobal',
  async (search, {getState, dispatch}) => {
    try {
      const prevSearch = getState().search.search;
      dispatch(clearState());
      dispatch(setSearch(search));
      if(prevSearch!=search && prevSearch!==''){
        dispatch(setForce(true));
      }
    } catch (error) {
      console.error('error = ', (error as Error).message);
      throw error;
    }

  }
);