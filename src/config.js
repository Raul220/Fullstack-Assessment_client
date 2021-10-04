import axios from 'axios';
export const apiUrl = 'http://localhost/';
//export const apiUrl = '/api/';
//export const imgUrl = '/api/img/';
let instance = axios.create({
  baseURL: apiUrl,
});
export default instance;