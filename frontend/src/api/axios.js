import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:5000/api', // ganti sesuai backend kamu
  withCredentials: false, // kalau backend pakai cookie, ubah ini jadi true
});

export default axiosInstance;
