import { configureStore } from '@reduxjs/toolkit';
import mainSearchSlice from '../features/mainSearch/slice';

export default configureStore({
  reducer: {
    mainSearch: mainSearchSlice.reducer,
  },
});
