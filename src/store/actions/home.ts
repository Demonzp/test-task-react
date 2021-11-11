import { createAsyncThunk } from '@reduxjs/toolkit';
import { fetchGifsReq } from '../../services/fetchGifs';
import { IResGifsParceServer } from '../../types/serverData';
import { RootState } from '../store';

export const fetchGifs = createAsyncThunk<IResGifsParceServer, void, {state: RootState}>(
  'home/fetchGifs',
  async (_, {getState}) => {
    try {
      const data = await fetchGifsReq(getState().home.page, getState().home.limit);
      return data;
    } catch (error) {
      throw error;
    }
  }
);
