import {
  OutlinedInput,
  InputLabel,
  MenuItem,
  FormControl,
  ListItemText,
  Select as ReactSelect,
  Checkbox
} from '@mui/material';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250
    }
  }
};

export const Select = ({ value, options, handleSelect }) => {
  return (
    <FormControl sx={{ m: 1, width: 300 }}>
      <InputLabel id="stock-multiple-checkbox-label">Stock</InputLabel>
      <ReactSelect
        labelId="stock-multiple-checkbox-label"
        id="stock-multiple-checkbox"
        multiple
        value={value}
        onChange={handleSelect}
        input={<OutlinedInput label="Stock" />}
        renderValue={(selected) => selected.join(', ')}
        MenuProps={MenuProps}>
        {options.map((item) => (
          <MenuItem key={item} value={item}>
            <Checkbox checked={value.indexOf(item) > -1} />
            <ListItemText primary={item} />
          </MenuItem>
        ))}
      </ReactSelect>
    </FormControl>
  );
};
