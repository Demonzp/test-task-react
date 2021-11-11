import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import sliceFavorites from './slices/sliceFavorites';
import sliceHome from './slices/sliceHome';
import sliceSearch from './slices/sliceSearch';

export const store = configureStore({
  reducer: {
    home: sliceHome.reducer,
    favorites: sliceFavorites.reducer,
    search: sliceSearch.reducer
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
