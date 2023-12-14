import axios from './customize-axios';

function fetchAllUser() {
  return axios.get('/api/users?page=1');
}

export { fetchAllUser };
