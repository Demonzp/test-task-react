import { createAsyncThunk } from '@reduxjs/toolkit';
import idxDB from '../../services/localGifs';
import { Gif } from '../../types/store';
import { IResGifsLocal } from '../../types/serverData';
import { RootState } from '../store';

export const addToFavorite = createAsyncThunk(
  'favorite/addToFavorite',
  async (gif: Gif) => {
    try {
      await idxDB.addGifReq(gif);
      return gif;
    } catch (error) {
      console.error('error = ', (error as Error).message);
      throw error;
    }

  }
);

export const getFavorites = createAsyncThunk<IResGifsLocal, void, {state: RootState}>(
  'favorite/getFavorites',
  async (_, {getState}) => {
    try {
      const data = await idxDB.getGifs(getState().favorites.page, getState().favorites.limit);
      return data;
    } catch (error) {
      console.error('error = ', (error as Error).message);
      throw error;
    }

  }
);

export const delFromFavorites = createAsyncThunk(
  'favorite/delFromFavorites',
  async (id: string) => {
    try {
      await idxDB.delGifReq(id);
      return id;
    } catch (error) {
      console.error('error = ', (error as Error).message);
      throw error;
    }

  }
);