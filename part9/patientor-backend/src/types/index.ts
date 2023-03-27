import { z } from "zod";

import {
  PatientRecordValidator,
  PublicPatientRecordValidator,
  NewPatientRecordValidator,
  GenderValidator,
  PatientEntryValidator,
  ExpandedDiagnosisValidator,
  NewPatientEntryValidator,
} from "../validators";

type Gender = z.infer<typeof GenderValidator>;

type ExpandedDiagnosis = z.infer<typeof ExpandedDiagnosisValidator>;

type PatientEntry = z.infer<typeof PatientEntryValidator>;

type NewPatientEntry = z.infer<typeof NewPatientEntryValidator>;

type PatientRecord = z.infer<typeof PatientRecordValidator>;

type PublicPatientRecord = z.infer<typeof PublicPatientRecordValidator>;

type NewPatientRecord = z.infer<typeof NewPatientRecordValidator>;

export {
  Gender,
  PatientRecord,
  ExpandedDiagnosis,
  PublicPatientRecord,
  NewPatientRecord,
  PatientEntry,
  NewPatientEntry,
};
