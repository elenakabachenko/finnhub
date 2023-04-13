import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import styled from '@emotion/styled';

const DateContainer = styled.div`
  display: flex;
  text-align: center;
  margin: 8px;
  > :first-of-type {
    margin-right: 8px !important;
  }
`;
export const DateRange = ({ startDate, endDate, setStartDate, setEndDate }) => {
  return (
    <DateContainer>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          label="From"
          value={startDate}
          disableFuture
          onChange={(newValue) => setStartDate(newValue)}
        />
        <DatePicker
          label="To"
          value={endDate}
          disableFuture
          onChange={(newValue) => setEndDate(newValue)}
        />
      </LocalizationProvider>
    </DateContainer>
  );
};
