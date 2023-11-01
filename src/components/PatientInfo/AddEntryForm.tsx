import './forms.css';
import { useState } from 'react';
import { useDiagnosesContext } from '../../hooks/useDiagnosesContext';
import { EntryWithoutId } from '../../types';
import { parseDate, inRange, isValidCode } from '../../helpers';

import { Button, Grid, TextField, Box, Typography } from '@mui/material';

interface Props {
  onSubmit: (values: EntryWithoutId ) => Promise<boolean>;
}

const allowedTypes: string[] = ['Hospital', 'HealthCheck', 'Occupational'];

const AddEntryForm = ({ onSubmit }: Props) => {
  const { diagnoses } = useDiagnosesContext();
  const [type, setType] = useState<string>('');
  // Base inputs
  const [description, setDescription] = useState<string>('');
  const [date, setDate] = useState<string>('');
  const [specialist, setSpecialist] = useState<string>('');
  const [codes, setCodes] = useState<string>('');
  // Specific Hospital inputs
  const [dischargeDate, setDischargeDate] = useState<string>('');
  const [dischargeCriteria, setDischargeCriteria] = useState<string>('');
  // Specific Hospital inputs
  const [rating, setRating] = useState<string>('');
  // Specific Occupational inputs
  const [employer, setEmployer] = useState<string>('');
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');

  const clearFields = () => {
    setDescription('');
    setDate('');
    setSpecialist('');
    setCodes('');
    if (type === 'Occupational') {
      setEmployer('');
      setStartDate('');
      setEndDate('');
    }
    if (type === 'Hospital') {
      setDischargeDate('');
      setDischargeCriteria('');
    }
    if (type === 'HealthCheck') setRating('');
  };

  const cancel = () => {
    clearFields();
    setType('');
  };

  const getHospitalEntry = (): EntryWithoutId => {
    const base = { description, date, specialist };
    const entry: EntryWithoutId = {
      type: 'Hospital', ...base,
      discharge: { 
        date: dischargeDate,
        criteria: dischargeCriteria
      }
    };
    if (codes !== '') entry.diagnosisCodes = codes.split(',');
    return entry;
  };

  const getHealthCheckEntry = (): EntryWithoutId => {
    const base = { description, date, specialist };
    const entry: EntryWithoutId = {
      type: 'HealthCheck', ...base,
      healthCheckRating: Number(rating)
    };
    if (codes !== '') entry.diagnosisCodes = codes.split(',');
    return entry;
  };

  const getOccupationalEntry = (): EntryWithoutId => {
    const base = { description, date, specialist };
    const entry: EntryWithoutId = {
      type: 'OccupationalHealthcare', ...base,
      employerName: employer
    };
    if (codes !== '') entry.diagnosisCodes = codes.split(',');
    if (startDate !== '' || endDate !== '') {
      entry.sickLeave = { startDate, endDate };
    }
    return entry;
  };

  const handleSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault();

    if (!allowedTypes.includes(type)) return;

    switch(type) {
      case 'Hospital':
        const result = await onSubmit(getHospitalEntry());
        if (result) clearFields();
        break;
      case 'HealthCheck':
        if (await onSubmit(getHealthCheckEntry())) clearFields();
        break;
      case 'Occupational':
        if (await onSubmit(getOccupationalEntry())) clearFields();
        break;
    }
  };

  return(
    <div>
      <Grid container spacing={2} padding={'10px 0'}>
        <Grid item>
          <h3 style={{ margin: '10px 0' }}>Add new entry</h3>
        </Grid>
        <Grid item>
          <Button
            variant='contained'
            color={ type === 'Hospital' ? 'secondary' : 'primary' }
            onClick={() => setType('Hospital')}
          >
            Hospital
          </Button>
        </Grid>
        <Grid item>
          <Button variant='contained'
            color={ type === 'HealthCheck' ? 'secondary' : 'primary' }
            onClick={() => setType('HealthCheck')}
          >
            HealthCheck
          </Button>
        </Grid>
        <Grid item>
          <Button variant='contained'
            color={ type === 'Occupational' ? 'secondary' : 'primary' }
            onClick={() => setType('Occupational')}
          >
            Occupational
          </Button>
        </Grid>
      </Grid>

      { allowedTypes.includes(type) && 
        <div className='entry-form'>
        <h3 style={{ margin: '10px 0' }}>New { type } entry</h3>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth label='Description'
            variant='standard' margin='dense'
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            error={description === ''}
          />
          <TextField
            fullWidth label='Date'
            variant='standard' margin='dense'
            value={date}
            onChange={(event) => setDate(event.target.value)}
            error={!parseDate(date)}
          />
          <TextField
            fullWidth label='Specialist'
            variant='standard' margin='dense'
            value={specialist}
            onChange={(event) => setSpecialist(event.target.value)}
            error={specialist === ''}
          />
          <TextField
            fullWidth label='Diagnosis Codes'
            variant='standard' margin='dense'
            value={codes}
            onChange={(event) => setCodes(event.target.value)}
            error={!isValidCode(codes, diagnoses)}
          />

          { type === 'Hospital' &&
            <Box mt={3} mb={0}>
              <Typography color={'rgba(0, 0, 0, 0.6)'} mb={0}>Discharge</Typography>  
              <Box display={'flex'} gap={6} ml={2}>
                <TextField margin='dense' label='Date'
                  variant='standard'
                  value={dischargeDate}
                  onChange={(event) => setDischargeDate(event.target.value)}
                  error={!parseDate(dischargeDate)}
                />
                <TextField margin='dense' label='Criteria'
                  variant='standard'
                  value={dischargeCriteria}
                  onChange={(event) => setDischargeCriteria(event.target.value)}
                  error={dischargeCriteria === ''}
                />
              </Box>
            </Box>
          }

          { type === 'HealthCheck' &&
            <>
              <TextField
                fullWidth label='HealthCheck Rating'
                variant='standard' margin='dense'
                value={rating}
                onChange={({ target }) => setRating(target.value)}
                error={!inRange(Number(rating), 0, 3)}
              />
            </>
          }

          { type === 'Occupational' &&
            <>
              <TextField
                fullWidth label='Employer Name'
                variant='standard' margin='dense'
                value={employer}
                onChange={(event) => setEmployer(event.target.value)}
                error={employer === ''}
              />
              <Box display={'flex'} gap={4} my={2}>
                <TextField
                  fullWidth label='Start Date'
                  variant='standard' margin='dense'
                  value={startDate}
                  onChange={(event) => setStartDate(event.target.value)}
                  error={!parseDate(startDate)}
                />
                <TextField
                  fullWidth label='End Date'
                  variant='standard' margin='dense'
                  value={endDate}
                  onChange={(event) => setEndDate(event.target.value)}
                  error={!parseDate(endDate)}
                />
              </Box>
            </>
          }

          <Grid container justifyContent='space-between' mt={5}>
            <Grid item>
              <Button variant='contained' type='button' color='error' onClick={cancel}>
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
      }

    </div>
  );
};

export default AddEntryForm;