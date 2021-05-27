import axios from 'axios';

export default axios.create({
  baseURL: 'https://rent-room-munich.herokuapp.com/customers',
});
