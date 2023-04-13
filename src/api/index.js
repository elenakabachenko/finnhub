const API_KEY = process.env.REACT_APP_API_KEY;
const API_URL = 'https://finnhub.io/api/v1/stock';

export const getStocks = async () => {
  const response = await fetch(`${API_URL}/symbol?exchange=US&mic=XNAS&token=${API_KEY}`);
  return response.json();
};

const fetchCandle = async (startDate, endDate, symbol) => {
  const response = await fetch(
    `${API_URL}/candle?symbol=${symbol}&resolution=D&from=${startDate}&to=${endDate}&token=${API_KEY}`
  );
  const data = await response.json();
  return { symbol, data };
};

export const getStockCandles = async (startDate, endDate, symbols) =>
  Promise.all(symbols.map((symbol) => fetchCandle(startDate, endDate, symbol)));
