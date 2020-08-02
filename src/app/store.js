import { configureStore } from '@reduxjs/toolkit';
import mainSearchSlice from '../features/mainSearch/slice';
import detailPageSlice from '../features/detailPage/slice';
import themeSlice from '../features/theme/slice';

export default configureStore({
  reducer: {
    mainSearch: mainSearchSlice.reducer,
    detailPage: detailPageSlice.reducer,
    theme: themeSlice.reducer,
  },
});
