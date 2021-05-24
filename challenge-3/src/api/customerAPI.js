import axios from 'axios';

export default axios.create({
  baseURL: 'http://localhost:3000/customers',
  // baseURL: 'https://rent-room-munich.herokuapp.com/customers',
});
