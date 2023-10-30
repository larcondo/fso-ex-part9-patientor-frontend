import { Entry, Diagnosis } from '../../types';
import { useDiagnosesContext } from '../../hooks/useDiagnosesContext';
import { Typography } from '@mui/material';

interface EntryInfoProps {
  entry: Entry
}

const EntryInfo = ({ entry }: EntryInfoProps) => {
  const { diagnoses } = useDiagnosesContext();

  const findDescription = ( code: string ) => {
    const desc: Diagnosis | undefined = diagnoses.find( d => d.code === code);
    return (desc === undefined) ? null : desc?.name;
  };

  return(
    <div>
      <Typography variant='body2'>
        { entry.date } { entry.description }
      </Typography> 
      
      { entry.diagnosisCodes &&
        <ul>
          { 
            entry.diagnosisCodes.map( (e, index) => {
              return (
                <li key={index}>
                  <Typography variant='body2'>
                    { e } { findDescription(e) }
                  </Typography>
                </li>
              );
            })
          }
        </ul>
      }
    </div>
  );
};

export default EntryInfo;