import { Dispatch, SetStateAction } from 'react';
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent
} from '@mui/material';

interface options {
  value: string | number;
  label: string;
}

interface Props {
  label: string;
  state: string;
  setFn: Dispatch<SetStateAction<string>>;
  error: boolean;
  options: options[]
}

const CustomSelect = ({ label, state, setFn, error, options }: Props) => {

  const handleChange = (event: SelectChangeEvent) => {
    setFn(event.target.value);
  };

  return(
    <FormControl fullWidth margin='normal'>
      <InputLabel id='select-label'>{ label }</InputLabel>
      <Select
        label={label}
        id='select-label' labelId='select-label'
        value={state} onChange={handleChange}
        error={error}
      >
        {
          options.map( (o, index) => {
            return <MenuItem value={o.value} key={index}>{o.label}</MenuItem>;
          })
        }
      </Select>
    </FormControl>
  );
};

export default CustomSelect;