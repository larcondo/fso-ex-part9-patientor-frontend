import { Entry } from '../../types';
import { Typography } from '@mui/material';

const EntryInfo = ({ entry }: { entry: Entry }) => {
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
                    { e }
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