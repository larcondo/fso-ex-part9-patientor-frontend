import { useState } from 'react';
import { useDiagnosesContext } from '../../hooks/useDiagnosesContext';
import { NewEntry } from '../../types';
import { TextField, Grid, Button } from '@mui/material';

interface Props {
  id: string | undefined;
  onSubmit: (values: NewEntry) => Promise<boolean>;
}

const AddEntryForm = ({ id, onSubmit }: Props) => {
  const { diagnoses } = useDiagnosesContext();
  const [rating, setRating] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [date, setDate] = useState<string>('');
  const [specialist, setSpecialist] = useState<string>('');
  const [codes, setCodes] = useState<string>('');

  const clearFields = () => {
    setDescription('');
    setDate('');
    setSpecialist('');
    setRating('');
    setCodes('');
  };

  const handleSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    const newEntry: NewEntry = {
      type: 'HealthCheck',
      description,
      date,
      specialist,
      healthCheckRating: Number(rating),
    };
    if (codes !== '') newEntry.diagnosisCodes = codes.split(',');
    const result = await onSubmit(newEntry);
    if (result) clearFields();
  };

  const inRange = (num: number, min: number, max: number): boolean => {
    return (( num-min )*( num-max ) <= 0);
  };

  const parseDate = (d: string): boolean => {
    // YYYY-MM-DD
    const dateRegex = new RegExp(/^\d{4}-\d{2}-\d{2}/, 'g');
    if (!dateRegex.test(d)) return false;

    const dateArray = d.split('-').map(p => parseInt(p, 10));
    const [yyyy, , dd ] = dateArray;
    let [, mm, ] = dateArray;
    mm -= 1;  // Month
    const newDate = new Date(yyyy, mm, dd);
    return mm === newDate.getMonth() && dd === newDate.getDate() && yyyy === newDate.getFullYear();
  };

  const isValidCode = (code: string): boolean => {
    // verify if code exists
    const codeExist = (c: string) => diagnoses.some(d => d.code === c);
    // create an array from input
    const codeArray = code.split(',');
    // if all codes exists, return true, otherwise, return false
    return codeArray.every(c => codeExist(c));
  };

  if (id === undefined) return null;

  return(
    <div style={{ border: '1px dashed gray', padding: '20px' }}>
      <h3>New HealthCheck entry</h3>
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label='Description'
          variant='standard'
          margin='dense'
          value={description}
          onChange={({ target }) => setDescription(target.value)}
          error={description.length <= 0}
        />
        <TextField
          fullWidth
          label='Date'
          variant='standard'
          margin='dense'
          value={date}
          onChange={({ target }) => setDate(target.value)}
          error={!parseDate(date)}
          helperText='Format YYYY-MM-DD'
        />
        <TextField
          fullWidth
          label='Specialist'
          variant='standard'
          margin='dense'
          value={specialist}
          onChange={({ target }) => setSpecialist(target.value)}
          error={specialist === ''}
        />
        <TextField
          fullWidth
          label='HealthCheck Rating'
          variant='standard'
          value={rating}
          onChange={({ target }) => setRating(target.value)}
          margin='dense'
          error={!inRange(Number(rating), 0, 3)}
        />
        <TextField
          fullWidth
          label='Diagnosis codes'
          variant='standard'
          margin='dense'
          value={codes}
          onChange={({ target }) => setCodes(target.value)}
          error={!isValidCode(codes)}
        />
        <Grid container justifyContent='space-between' margin='20px 0 0 0'>
          <Grid item>
            <Button variant='contained' type='button'
              color='error' onClick={clearFields}>
              Cancel
            </Button>
          </Grid>
          <Grid item>
            <Button variant='contained' type='submit'>
              Add entry
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default AddEntryForm;