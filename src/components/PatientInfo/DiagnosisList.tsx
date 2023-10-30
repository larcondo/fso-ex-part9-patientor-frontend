import { Entry, Diagnosis } from '../../types';
import { useDiagnosesContext } from '../../hooks/useDiagnosesContext';
import { Typography } from '@mui/material';

const DiagnosisList = ({ entry }: { entry: Entry }) => {
  const { diagnoses } = useDiagnosesContext();

  const findDescription = ( code: string ) => {
    const desc: Diagnosis | undefined = diagnoses.find( d => d.code === code);
    return (desc === undefined) ? null : desc?.name;
  };

  if (!entry.diagnosisCodes || entry.diagnosisCodes.length === 0) {
    return null;
  }

  return(
    <>
      <ul>
        {
          entry.diagnosisCodes.map((e, index) => {
            return(
              <li key={index}>
                <Typography variant='body2'>
                  { e } <i>{ findDescription(e) }</i>
                </Typography>
              </li>
            );
          })
        }
      </ul>
    </>
  );
};

export default DiagnosisList;