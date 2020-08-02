import { createSlice } from '@reduxjs/toolkit';
import { fetchUsers } from './api';

let slice = createSlice({
  name: 'mainSearch',
  initialState: {
    pristine: true,
    users: [],
    searchText: '',
    loading: false,
    error: null,
    total: 0,
  },
  reducers: {
    startUserSearch: (state, { payload }) => {
      state.loading = true;
      state.searchText = payload;
      state.pristine = false;
    },
    userSearchDone: (state, { payload: { err, res } }) => {
      state.loading = false;
      state.users = [];
      state.error = err;
      state.total = 0;
      if (err) {
        return;
      }
      state.users = res.items;
      state.total = res.total_count;
    },
  },
});

export let {
  startUserSearch,
  userSearchDone,
} = slice.actions;

export let userSearchThunk = (username, page = 1) => async dispatch => {
  if (!username || username.length < 2) return;
  dispatch(startUserSearch(username));
  let [res, err] = await fetchUsers({ username, page });
  dispatch(userSearchDone({ err, res }));
};

export default slice;
