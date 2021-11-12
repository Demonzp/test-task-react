import { createAsyncThunk } from '@reduxjs/toolkit';
import { searchGifsReq } from '../../services/fetchGifs';
import { ICustomError, IResSearchGifs } from '../../types/serverData';
import { clearState, setForce, setSearch } from '../slices/sliceSearch';
import { AppDispatch, RootState } from '../store';

export const searchGifs = createAsyncThunk<IResSearchGifs, void, {state: RootState, rejectWithValue: ICustomError}>(
  'search/searchGifs',
  async (_, {getState, rejectWithValue}) => {
    const page = getState().search.page;
    const limit = getState().search.limit;
    try {
      const data = await searchGifsReq(getState().search.search, getState().search.page, getState().search.limit);
      return data;
    } catch (error) {
      return rejectWithValue({message: (error as Error).message, offset:page<=1?0:(page-1)*limit});
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
      if(prevSearch!==search && prevSearch!==''){
        dispatch(setForce(true));
      }
    } catch (error) {
      console.error('error = ', (error as Error).message);
      throw error;
    }

  }
);