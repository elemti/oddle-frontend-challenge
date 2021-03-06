import { createSlice } from '@reduxjs/toolkit';
import { fetchSingleUser, fetchUserRepos, fetchUserFollowers, fetchUserFollowings } from './api';
import { USER_REPOS_PAGE_SIZE, USER_FOLLOWERS_PAGE_SIZE } from '../../app/constants';

let slice = createSlice({
  name: 'detailPage',
  initialState: {
    userDetail: null,
    loadingUserDetail: false,
    loadUserDetailError: null,

    userRepos: [],
    loadingUserRepos: false,
    loadUserReposError: null,
    userReposPage: 1,
    hasMoreRepos: false,

    userFollowers: [],
    loadingUserFollowers: false,
    loadUserFollowersError: null,
    userFollowersPage: 1,
    hasMoreFollowers: false,

    userFollowings: [],
    loadingUserFollowings: false,
    loadUserFollowingsError: null,
    userFollowingsPage: 1,
    hasMoreFollowings: false,
  },
  reducers: {
    getUserDetail: (state, { payload }) => {
      state.loadingUserDetail = true;
    },
    getUserDetailDone: (state, { payload: { err, res } }) => {
      state.loadingUserDetail = false;
      state.loadUserDetailError = err;
      state.userDetail = null;
      if (err) {
        return;
      }
      state.userDetail = res;
    },
    getUserRepos: (state, { payload }) => {
      state.loadingUserRepos = true;
    },
    getUserReposDone: (state, { payload: { err, res, page } }) => {
      state.loadingUserRepos = false;
      state.hasMoreRepos = false;
      state.loadUserReposError = err;
      if (err || !res.length) {
        state.userRepos = [];
        return;
      }
      state.userReposPage = page;
      state.hasMoreRepos = res.length === USER_REPOS_PAGE_SIZE;
      state.userRepos = res;
    },
    getUserFollowers: (state, { payload }) => {
      state.loadingUserFollowers = true;
    },
    getUserFollowersDone: (state, { payload: { err, res, page } }) => {
      state.loadingUserFollowers = false;
      state.loadUserFollowersError = err;
      state.hasMoreFollowers = false;
      if (err || !res.length) {
        state.userFollowers = [];
        return;
      }
      state.userFollowersPage = page;
      state.hasMoreFollowers = res.length === USER_FOLLOWERS_PAGE_SIZE;
      state.userFollowers = res;
    },
    getUserFollowings: (state, { payload }) => {
      state.loadingUserFollowings = true;
    },
    getUserFollowingsDone: (state, { payload: { err, res, page } }) => {
      state.loadingUserFollowings = false;
      state.loadUserFollowingsError = err;
      state.hasMoreFollowings = false;
      if (err || !res.length) {
        state.userFollowings = [];
        return;
      }
      state.userFollowingsPage = page;
      state.hasMoreFollowings = res.length === USER_FOLLOWERS_PAGE_SIZE;
      state.userFollowings = res;
    },
  },
});

export let {
  getUserDetail,
  getUserDetailDone,
  getUserRepos,
  getUserReposDone,
  getUserFollowers,
  getUserFollowersDone,
  getUserFollowings,
  getUserFollowingsDone,
} = slice.actions;

export let userDetailThunk = username => async dispatch => {
  if (!username || username.length < 2) return;
  dispatch(getUserDetail(username));
  dispatch(getUserReposThunk(username));
  dispatch(getUserFollowersThunk(username));
  dispatch(getUserFollowingsThunk(username));
  let [res, err] = await fetchSingleUser(username);
  dispatch(getUserDetailDone({ err, res }));
};

export let getUserReposThunk = (username, page = 1) => async dispatch => {
  if (!username || username.length < 2) return;
  dispatch(getUserRepos());
  let [res, err] = await fetchUserRepos(username, page);
  dispatch(getUserReposDone({ err, res, page }));
};

export let getUserFollowersThunk = (username, page = 1) => async dispatch => {
  if (!username || username.length < 2) return;
  dispatch(getUserFollowers());
  let [res, err] = await fetchUserFollowers(username, page);
  dispatch(getUserFollowersDone({ err, res, page }));
};

export let getUserFollowingsThunk = (username, page = 1) => async dispatch => {
  if (!username || username.length < 2) return;
  dispatch(getUserFollowings());
  let [res, err] = await fetchUserFollowings(username, page);
  dispatch(getUserFollowingsDone({ err, res, page }));
};

export default slice;
