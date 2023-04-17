import {
  InputAdornment,
  IconButton,
  InputLabel,
  FormControl,
  Input
} from '@mui/material';
import React, { useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import ClearIcon from '@mui/icons-material/Clear';

  const box = {
    display: 'flex',
    alignItems: 'center',
    padding: '10px',
  };

export const SearchInput: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const name = searchParams.get('name') || '';

  const updateSearch = useCallback((params: {[key: string]: string | null}) => {
    Object.entries(params).forEach(([key, value]) => {
      if (!value) {
        searchParams.delete(key);
      } else {
        searchParams.set(key, value);
      }
    })

    setSearchParams(searchParams);
  }, []);

  const onChangeParams = (str: string | null) => updateSearch(
    {name: !str ? null : str}
  );

  return (
    <FormControl sx={{ m: 1, width: '110px',
      '&:focus': {
        width: '150px'
      }
    }} variant="standard">
      <InputLabel htmlFor="standard-adornment-password">Search</InputLabel>
      <Input
        value={name}
        onChange={event => onChangeParams(event.target.value)}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label="clearing"
              onClick={() => onChangeParams(null)}
            >
              {name && <ClearIcon />}
            </IconButton>
          </InputAdornment>
        }
      />
    </FormControl>
  );
};