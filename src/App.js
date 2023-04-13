import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from '@emotion/styled';
import dayjs from 'dayjs';

import { fetchStockSymbol } from './store/features/stockSymbolSlice';
import { fetchStockCandles } from './store/features/stockCandlesSymbol';
import { Chart, DateRange, Select, RadioGroup } from './components';
import './App.css';

const Wrapper = styled('div')({
  display: 'flex',
  justifyContent: 'center',
  margin: 50
});

const priceOptions = [
  { value: 'o', label: 'Open prices' },
  { value: 'h', label: 'High prices' },
  { value: 'l', label: 'Low prices' },
  { value: 'c', label: 'Close prices' }
];

function App() {
  const dispatch = useDispatch();
  const stockCandles = useSelector((state) => state.stockCandles);
  const stockSymbol = useSelector((state) => state.stockSymbol);

  const [seriesData, setSeriesData] = useState([]);
  const [typePrice, setTypePrice] = useState('o');
  const [startDate, setStartDate] = useState(dayjs().subtract(1, 'month'));
  const [endDate, setEndDate] = useState(dayjs());
  const [stockNames, setStockNames] = useState([]);

  useEffect(() => {
    dispatch(fetchStockSymbol());
  }, []);

  useEffect(() => {
    if (startDate && endDate) {
      const unixStartDate = dayjs(startDate).unix();
      const unixEndDate = dayjs(endDate).unix();
      dispatch(
        fetchStockCandles({ startDate: unixStartDate, endDate: unixEndDate, symbols: stockNames })
      );
    }
  }, [startDate, endDate, stockNames]);

  useEffect(() => {
    const series = stockCandles.data.map((curr) => {
      if (curr.data.s === 'no_data') {
        return { name: curr.symbol, data: [] };
      }
      const data = curr?.data?.t.reduce((accChild, currChild, ind) => {
        accChild.push({ x: currChild * 1000, y: curr.data[typePrice][ind] });
        return accChild;
      }, []);
      return { name: curr.symbol, data };
    });

    setSeriesData(series);
  }, [stockCandles.data, typePrice]);

  const handleChangeSelect = (event) => {
    const {
      target: { value }
    } = event;
    if (value.length <= 3) {
      setStockNames(typeof value === 'string' ? value.split(',') : value);
    }
  };

  const onChangePriceType = (event) => {
    setTypePrice(event.target.value);
  };

  return (
    <div className="App">
      <Wrapper>
        <Select options={stockSymbol.data} value={stockNames} handleSelect={handleChangeSelect} />
        <DateRange
          startDate={startDate}
          endDate={endDate}
          setStartDate={setStartDate}
          setEndDate={setEndDate}
        />
      </Wrapper>
      <Chart series={seriesData} />
      {!!seriesData.length && (
        <RadioGroup value={typePrice} onChange={onChangePriceType} options={priceOptions} />
      )}
    </div>
  );
}

export default App;
