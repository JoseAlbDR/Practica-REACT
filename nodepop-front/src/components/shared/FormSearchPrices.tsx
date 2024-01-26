import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import { useState } from 'react';

interface FormSearchPricesProps {
  defaultValue: [number, number];
}

const FormSearchPrices = ({ defaultValue }: FormSearchPricesProps) => {
  const [value, setValue] = useState<[number, number]>(defaultValue);

  const handleChange = (_event: Event, newValue: number | number[]) => {
    setValue(newValue as [number, number]);
  };

  return (
    <Box
      sx={{
        marginRight: '1rem',
      }}
    >
      <label className="form-label" htmlFor="price">
        price
      </label>
      <Slider
        min={defaultValue[0]}
        max={defaultValue[1]}
        value={value}
        step={1}
        name="price"
        onChange={handleChange}
        valueLabelDisplay="auto"
        sx={{ marginLeft: 1, color: '#8b5cf6' }}
      />
    </Box>
  );
};

export default FormSearchPrices;
