import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import { useEffect, useState } from 'react';
import { SubmitFunction, useSearchParams } from 'react-router-dom';

import { changePriceUrl } from '../../utils';

const FormSearchPrices = ({
  onChange,
  defaultValue,
}: {
  onChange: SubmitFunction;
  defaultValue: [number, number];
}) => {
  const [value, setValue] = useState<[number, number]>(defaultValue);

  const [searchParams] = useSearchParams();

  const params = Object.fromEntries(searchParams);
  const currentMinPrice = params['min-price'];
  const currentMaxPrice = params['max-price'];

  useEffect(() => {
    if (currentMinPrice && currentMaxPrice)
      setValue([+currentMinPrice, +currentMaxPrice]);
  }, [currentMinPrice, currentMaxPrice]);

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
        // defaultValue={minPrice}
        min={defaultValue[0]}
        max={defaultValue[1]}
        value={value}
        step={1}
        name="price"
        onChange={handleChange}
        onChangeCommitted={() => {
          const form = document.getElementById('search-form');
          if (form) changePriceUrl(form as HTMLFormElement);
          onChange(form as HTMLFormElement);
        }}
        valueLabelDisplay="auto"
        sx={{ marginLeft: 1, color: '#8b5cf6' }}
      />
    </Box>
  );
};

export default FormSearchPrices;
