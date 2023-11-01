import { Patient, Gender, EntryWithoutId } from '../../types';
import patientService from '../../services/patients';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import EntryInfo from './EntryInfo';
import AddEntryForm from './AddEntryForm';

import axios from 'axios';
import { Typography, Alert } from '@mui/material';
import { Female, Male } from '@mui/icons-material';

import './index.css';

const PatientInfo = () => {
  const { id } = useParams();
  const [patient, setPatient] = useState<Patient>();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {

    const fetchPatientInfo =  async () => {
      try {
        const patientInfo = await patientService.getById(id);
        setPatient(patientInfo);
      } catch(error: unknown) {
        console.error(error);
      }
    };

    void fetchPatientInfo();
  },  []);

  const genderIcon = (g: Gender | undefined ) => {
    switch(g) {
      case Gender.Male:
        return <Male />;
      case Gender.Female:
        return <Female />;
      default:
        return null;
    }
  };

  const showError = (text: string) => {
    setErrorMessage(text);
    setTimeout(() => setErrorMessage(null), 3000);
  };

  const submitNewEntry = async (values: EntryWithoutId) => {
    try {
      const updatedPatient = await patientService.postNewEntry(id as string, values);
      setPatient(updatedPatient);
      return true;
    } catch(error: unknown) {
      
      if (axios.isAxiosError(error)) {
        if (error.response?.data && typeof error.response.data === 'string') {
          const PREFIX = 'Something went wrong. Error: ';
          const msg = error.response.data.replace(PREFIX, '');
          console.log(msg);
          showError(msg);
        } else {
          showError('Unrecognized axios error');  
        }
      } else {
        console.log('Unknown error', error);
        showError('Unknown error');
      }
      return false;
    }
  };

  if (!id) return <div>loading...</div>;

  return(
    <div className='App'>
      <Typography variant='h4' marginTop={'20px'}>
        {patient?.name} {genderIcon(patient?.gender)}
      </Typography>
      <Typography variant='body1'>ssn: {patient?.ssn}</Typography>
      <Typography variant='body1'>occupation: {patient?.occupation}</Typography>

      { errorMessage && <Alert severity='error'>{ errorMessage }</Alert> }

      <AddEntryForm onSubmit={submitNewEntry} />

      <Typography variant='h6' margin={'16px 0'}>entries</Typography>
      {
        patient?.entries
          ? patient.entries.length > 0
            ? patient.entries.map( e => <EntryInfo entry={e} key={e.id} /> )
            : <Typography variant='body2'>This patient has no entries.</Typography>
          : <Typography variant='body2'>This patient has no entries.</Typography>
      }

    </div>
  );
};

export default PatientInfo;