// curl   -H "Accept: application/vnd.github.v3+json"   https://api.github.com/search/users?q=elem

import axios from 'axios';
import mockApi from './mockApi';

let apiInstance = axios.create({
  headers: {
    'Accept': 'application/vnd.github.v3+json',
    'Authorization': `token ${process.env.REACT_APP_GITHUB_PAT}`,
  },
  baseURL: 'https://api.github.com',
  timeout: 60*1000,
});

if (process.env.REACT_APP_MOCK_API === 'true') {
  console.warn('mocking API responses (REACT_APP_MOCK_API is set to true)');
  mockApi(apiInstance);
}

export default apiInstance;
