import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getStockCandles } from '../../api';

const initialState = {
  data: [],
  isLoading: true
};

export const fetchStockCandles = createAsyncThunk(
  'stockCandles/fetch',
  async ({ startDate, endDate, symbols }) => getStockCandles(startDate, endDate, symbols)
);

export const StockCandlesSlice = createSlice({
  name: 'stockCandles',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchStockCandles.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchStockCandles.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(fetchStockCandles.rejected, (state) => {
        state.isLoading = false;
      });
  }
});

export default StockCandlesSlice.reducer;
