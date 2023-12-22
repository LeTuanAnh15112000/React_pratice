import axios from './customize-axios';

function fetchAllUser(page) {
  return axios.get(`/api/users?page=${page}`);
}

export { fetchAllUser };
