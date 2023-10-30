import { Entry } from '../../types';
import { assertNever } from '../../helpers';
import HospitalEntry from './HospitalInfo';
import HealthCheckInfo from './HealthCheckInfo';
import OccupationalInfo from './OccupationalInfo';

const EntryInfo = ({ entry }: { entry: Entry }) => {
  switch (entry.type) {
    case 'Hospital':
      return <HospitalEntry entry={entry} />;
    case 'HealthCheck':
      return <HealthCheckInfo entry={entry} />;
    case 'OccupationalHealthcare':
      return <OccupationalInfo entry={entry} />;
    default:
      return assertNever(entry);
  }
};

export default EntryInfo;