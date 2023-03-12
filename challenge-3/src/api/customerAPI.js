import axios from 'axios';

export default axios.create({
  baseURL: 'https://rentroom.hardim.tech/customers',
  // baseURL: 'http://localhost:3000/customers',
});
