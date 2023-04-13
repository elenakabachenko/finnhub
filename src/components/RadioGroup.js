import { FormControl, FormControlLabel, Radio, RadioGroup as ReactRadioGroup } from '@mui/material';

export const RadioGroup = ({ value, onChange, options }) => {
  return (
    <FormControl>
      <ReactRadioGroup
        row
        aria-labelledby="prices-controlled-radio-buttons-group"
        name="controlled-radio-buttons-group"
        value={value}
        onChange={onChange}>
        {options.map((opt) => (
          <FormControlLabel
            key={opt.value}
            value={opt.value}
            control={<Radio />}
            label={opt.label}
          />
        ))}
      </ReactRadioGroup>
    </FormControl>
  );
};
