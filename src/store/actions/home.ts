import { createAsyncThunk } from '@reduxjs/toolkit';
import { fetchGifsReq } from '../../services/fetchGifs';
import { ICustomError, IResGifsParceServer } from '../../types/serverData';
import { RootState } from '../store';

export const fetchGifs = createAsyncThunk<IResGifsParceServer, void, {state: RootState, rejectWithValue: ICustomError}>(
  'home/fetchGifs',
  async (_, {getState, rejectWithValue}) => {
    const page = getState().home.page;
    const limit = getState().home.limit;
    try {
      const data = await fetchGifsReq(page, limit);
      return data;
    } catch (error) {
      return rejectWithValue({message: (error as Error).message, offset:page<=1?0:(page-1)*limit});
    }
  }
);
