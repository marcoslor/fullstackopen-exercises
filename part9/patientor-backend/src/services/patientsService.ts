import patients from "../data/patients";
import { PatientRecord, PublicPatientRecord } from "../types";

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

export { getPatients, getPublicPatientRecords };
