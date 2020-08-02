import qs from 'query-string';
import mem from 'mem';
import githubApi from '../../app/githubApi';
import takeLatestAsync from '../../utils/takeLatestAsync';
import { USER_REPOS_PAGE_SIZE, USER_FOLLOWERS_PAGE_SIZE } from '../../app/constants';

let memOpts = {
  cacheKey: JSON.stringify,
  maxAge: 5 * 60 * 1000,
};

export let fetchSingleUser = takeLatestAsync(mem(async username => {
  let { data } = await githubApi.get(`/users/${username}`);
  return data;
}, memOpts));

export let fetchUserRepos = takeLatestAsync(mem(async (username, page) => {
  let params = {
    per_page: USER_REPOS_PAGE_SIZE,
    page,
    username,
  };
  let { data } = await githubApi.get(`/users/${username}/repos?${qs.stringify(params)}`);
  return data;
}, memOpts));

export let fetchUserFollowers = takeLatestAsync(mem(async (username, page) => {
  let params = {
    per_page: USER_FOLLOWERS_PAGE_SIZE,
    page,
    username,
  };
  let { data } = await githubApi.get(`/users/${username}/followers?${qs.stringify(params)}`);
  return data;
}, memOpts));

export let fetchUserFollowings = takeLatestAsync(mem(async (username, page) => {
  let params = {
    per_page: USER_FOLLOWERS_PAGE_SIZE,
    page,
    username,
  };
  let { data } = await githubApi.get(`/users/${username}/following?${qs.stringify(params)}`);
  return data;
}, memOpts));
