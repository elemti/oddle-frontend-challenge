import qs from 'query-string';
import mem from 'mem';
import githubApi from '../../app/githubApi';
import takeLatestAsync from '../../utils/takeLatestAsync';
import { PAGE_SIZE } from '../../app/constants';

let memOpts = {
  cacheKey: JSON.stringify,
  maxAge: 5 * 60 * 1000,
};

export let fetchUsers = takeLatestAsync(mem(async ({ username, page }) => {
  let params = {
    q: username,
    per_page: PAGE_SIZE,
    page,
  };
  let { data } = await githubApi.get(`/search/users?${qs.stringify(params)}`);
  return data;
}, memOpts));
