import { OccupationalHealthcareEntry, SickLeave } from '../../types';
import { Typography, Table, TableHead, TableCell, TableRow, TableBody } from '@mui/material';
import { Work } from '@mui/icons-material';
import DiagnosisList from './DiagnosisList';

const OccupationalInfo = ({ entry }: { entry: OccupationalHealthcareEntry }) => {
  return(
    <div className='occupational entry'>
      <Typography variant='body2'>
        { entry.date } <Work /> { entry.employerName }
      </Typography>

      <Typography variant='body2' m={'10px 0'}>
        <i>{ entry.description }</i>
      </Typography>

      <Typography variant='body2' m={'10px 0'}>
        diagnose by <b>{ entry.specialist }</b>
      </Typography>

      <DiagnosisList entry={entry} />

      <SickLeaveInfo sl={entry.sickLeave} />

      <Typography variant='body2' align='right' fontSize={'0.75em'} color={'red'}>
        { entry.type }
      </Typography>
    </div>
  );
};

const SickLeaveInfo = ({ sl }: { sl: SickLeave | undefined }) => {
  if (!sl) return null;

  return (
    <Table style={{ width: 'fit-content' }}>
      <TableHead>
        <TableRow>
          <TableCell>Start Date</TableCell>
          <TableCell>End Date</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
      <TableRow>
          <TableCell>{ sl.startDate }</TableCell>
          <TableCell>{ sl.endDate }</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
};

export default OccupationalInfo;