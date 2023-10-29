import { Patient, Gender } from '../../types';
import patientService from '../../services/patients';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Typography } from '@mui/material';
import { Female, Male } from '@mui/icons-material';

const PatientInfo = () => {
  const { id } = useParams();
  const [patient, setPatient] = useState<Patient>();

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

  if (!id) return <div>loading...</div>;

  return(
    <div className='App'>
      <Typography variant='h4' marginTop={'20px'}>
        {patient?.name} {genderIcon(patient?.gender)}
      </Typography>
      <Typography variant='body1'>ssn: {patient?.ssn}</Typography>
      <Typography variant='body1'>occupation: {patient?.occupation}</Typography>
    </div>
  );
};

export default PatientInfo;