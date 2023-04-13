import { configureStore } from '@reduxjs/toolkit';
import stockSymbolReducer from './features/stockSymbolSlice';
import stockCandleReducer from './features/stockCandlesSymbol';

const store = configureStore({
  reducer: {
    stockSymbol: stockSymbolReducer,
    stockCandles: stockCandleReducer
  }
});

export default store;
