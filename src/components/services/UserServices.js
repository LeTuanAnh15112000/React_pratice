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

function deleteUser(userId) {
  return axios.delete(`/api/users/${userId}`);
}

function loginApi(email, password) {
  return axios.post('/api/login/', { email, password });
}

export { fetchAllUser, postCreateUser, putUpdateUser, deleteUser, loginApi };
