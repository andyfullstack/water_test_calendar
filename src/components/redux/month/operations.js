import axios from 'axios';
axios.defaults.baseURL = 'https://tracker-of-water-oqqk.onrender.com/api';
export const getCurrentDateInfoAPI = async date => {
  const { data } = await axios.get('/water', date);
  return data;
};

export const getCurrentMonthAPI = async date => {
  const { data } = await axios.get('/month', date);
  return data;
};

export const getMonthInfoAPI = async month => {
  const { data } = await axios.get('/month', month);
  return data;
};

export const getMonthDateInfoAPI = async date => {
  const { data } = await axios.get('/month', date);
  return data;
};
