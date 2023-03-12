import axios from 'axios';

export default axios.create({
  baseURL: 'https://server.hardim.tech/customers',
  // baseURL: 'http://localhost:3000/customers',
});
