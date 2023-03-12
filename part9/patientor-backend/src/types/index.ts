type Gender = "other" | "female" | "male";

interface DiagnosisRecord {
  code: string;
  name: string;
  latin?: string;
}

interface PatientRecord {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: Gender;
  occupation: string;
}

type PublicPatientRecord = Omit<PatientRecord, "ssn">;

export { PatientRecord, DiagnosisRecord, PublicPatientRecord, Gender };
