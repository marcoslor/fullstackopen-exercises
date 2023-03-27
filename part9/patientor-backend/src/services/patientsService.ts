import { v1 as uuid } from "uuid";

import patients from "../data/patients";
import {
  NewPatientEntry,
  NewPatientRecord,
  PatientEntry,
  PatientRecord,
  PublicPatientRecord,
} from "../types";

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

const addPatient = (patient: NewPatientRecord): PatientRecord => {
  const NewPatientRecord = {
    id: uuid(),
    ...patient,
  };

  patients.push(NewPatientRecord);
  return NewPatientRecord;
};

const addEntry = (
  patient: PatientRecord,
  entry: NewPatientEntry
): PatientEntry => {
  const newPatientEntry = {
    id: uuid(),
    ...entry,
  };

  if (!patient.entries) {
    patient.entries = [];
  }

  patient.entries.push(newPatientEntry);
  return newPatientEntry;
};

export { getPatients, getPublicPatientRecords, addPatient, addEntry };
