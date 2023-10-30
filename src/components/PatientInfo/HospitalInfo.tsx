import { HospitalEntry } from '../../types';
import { Typography } from '@mui/material';
import { MedicalServices } from '@mui/icons-material';
import DiagnosisList from './DiagnosisList';

const HospitalInfo = ({ entry }: { entry: HospitalEntry }) => {
  return(
    <div className='hospital entry'>
      <Typography variant='body2'>
        { entry.date } <MedicalServices />
      </Typography>

      <Typography variant='body2' m={'10px 0'}>
        <i>{ entry.description }</i>
      </Typography>

      <Typography variant='body2'>
        diagnose by <b>{ entry.specialist }</b>
      </Typography>

      <DiagnosisList entry={entry} />

      <Typography variant='body2'>
        <b>discharge:</b> ({ entry.discharge.date }) { entry.discharge.criteria }
      </Typography>

      <Typography variant='body2' align='right' fontSize={'0.75em'} color={'blue'}>
        { entry.type }
      </Typography>
      
    </div>
  );
};

export default HospitalInfo;