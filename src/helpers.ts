import { Diagnosis } from './types';

export const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

export const parseDate = (d: string): boolean => {
  // YYYY-MM-DD
  const dateRegex = new RegExp(/^\d{4}-\d{2}-\d{2}/, 'g');
  if (!dateRegex.test(d)) return false;

  const dateArray = d.split('-').map(p => parseInt(p, 10));
  const [yyyy, , dd ] = dateArray;
  let [, mm, ] = dateArray;
  mm -= 1;  // Month
  const newDate = new Date(yyyy, mm, dd);
  return mm === newDate.getMonth() && dd === newDate.getDate() && yyyy === newDate.getFullYear();
};

export const inRange = (num: number, min: number, max: number): boolean => {
  return (( num-min )*( num-max ) <= 0);
};

export const isValidCode = (code: string, diagnoses: Diagnosis[]): boolean => {
  // verify if code exists
  const codeExist = (c: string) => diagnoses.some(d => d.code === c);
  // create an array from input
  const codeArray = code.split(',');
  // if all codes exists, return true, otherwise, return false
  return codeArray.every(c => codeExist(c));
};