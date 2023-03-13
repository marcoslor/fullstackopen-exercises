import { v1 as uuid } from "uuid";

import patients from "../data/patients";
import { NewPatientEntry, PatientRecord, PublicPatientRecord } from "../types";

const getPatients = (): Array<PatientRecord> => {
  return patients;
};

const getPublicPatientRecords = (): PublicPatientRecord[] => {
  return getPatients().map(({ name, id, dateOfBirth, gender, occupation }) => ({
    name,
    id,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const addPatient = (patient: NewPatientEntry): PatientRecord => {
  const newPatientEntry = {
    id: uuid(),
    ...patient,
  };

  patients.push(newPatientEntry);
  return newPatientEntry;
};

export { getPatients, getPublicPatientRecords, addPatient };
