import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getStocks } from '../../api';

const initialState = {
  data: [],
  isLoading: true
};

export const fetchStockSymbol = createAsyncThunk('stockSymbol/fetch', getStocks);

export const StockSymbolSlice = createSlice({
  name: 'stockSymbol',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchStockSymbol.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchStockSymbol.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload.slice(0, 20).map((item) => item.symbol);
      })
      .addCase(fetchStockSymbol.rejected, (state) => {
        state.isLoading = false;
      });
  }
});

export default StockSymbolSlice.reducer;
