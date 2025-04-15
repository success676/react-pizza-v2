import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import axios from 'axios';

const initialState = {
  items: [],
  status: 'loading',
};

export const fetchPizzas = createAsyncThunk('pizza/fetchPizzasStatus', async (params) => {
  const { sortBy, order, category, search, currentPage } = params;

  const { data } = await axios.get(
    `https://6792b413cf994cc6804add23.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`,
  );
  return data;
});

export const pizzaSlice = createSlice({
  name: 'pizza',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      // fetchPizzas
      .addCase(fetchPizzas.pending, (state) => {
        state.status = 'loading';
        state.items = [];
      })
      .addCase(fetchPizzas.fulfilled, (state, action) => {
        state.items = action.payload;
        state.status = 'success';
      })
      .addCase(fetchPizzas.rejected, (state) => {
        state.status = 'error';
        state.items = [];
      });
  },
});

export const selectPizzaData = (state) => state.pizza;

export const {} = pizzaSlice.actions;

export default pizzaSlice.reducer;
