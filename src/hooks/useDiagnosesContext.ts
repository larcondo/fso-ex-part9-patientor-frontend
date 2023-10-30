import { createContext, useContext } from 'react';
import { Diagnosis } from '../types';

type DiagnosesContent = {
  diagnoses: Diagnosis[]
};

export const DiagnosesContext = createContext<DiagnosesContent>({
  diagnoses: []
});

export const useDiagnosesContext = () => useContext(DiagnosesContext);