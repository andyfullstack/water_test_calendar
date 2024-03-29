import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

axios.defaults.baseURL = 'https://tracker-of-water-oqqk.onrender.com/api/ ';

export const fetchMonthThunk = createAsyncThunk(
  ' ',
  async (month, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`api/water/month?date=${month}`);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
