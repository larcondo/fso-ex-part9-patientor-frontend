import { Dispatch, SetStateAction } from 'react';
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent
} from '@mui/material';
import { Diagnosis } from '../../types';

interface Props {
  options: Diagnosis[];
  label: string;
  state: string[];
  setFn: Dispatch<SetStateAction<string[]>>
}

const DiagnosisSelect = ({ options, label, state, setFn }: Props) => {

  const handleChange = (event: SelectChangeEvent<typeof state>) => {
    const { target: { value } } = event;
    setFn(
      typeof value === 'string' ? value.split(',') : value
    );
  };

  return(
    <div>
      <FormControl fullWidth margin='normal'>
        <InputLabel id='label-name'>{ label }</InputLabel>
        <Select
          labelId='label-name'
          label={ label }
          value={state}
          multiple
          onChange={handleChange}
        >
          {
            options.map( o => <MenuItem key={o.code} value={o.code}>{o.code}</MenuItem> )
          }
        </Select>
      </FormControl>
    </div>
  );
};

export default DiagnosisSelect;