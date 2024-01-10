import axios from './customize-axios';

function fetchAllUser(page) {
  return axios.get(`/api/users?page=${page}`);
}

function postCreateUser(name, job) {
  return axios.post('/api/users', { name, job });
}

function putUpdateUser(userId, name, job) {
  return axios.put(`/api/users/${userId}`, { name, job });
}

export { fetchAllUser, postCreateUser, putUpdateUser };
