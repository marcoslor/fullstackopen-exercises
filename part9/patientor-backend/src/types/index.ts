import { z } from "zod";

import {
  PatientRecordValidator,
  PublicPatientRecordValidator,
  NewPatientEntryValidator,
  GenderValidator,
  EntryValidator,
} from "../validators";

type Gender = z.infer<typeof GenderValidator>;

interface DiagnosisRecord {
  code: string;
  name: string;
  latin?: string;
}

type PatientRecord = z.infer<typeof PatientRecordValidator>;

type PublicPatientRecord = z.infer<typeof PublicPatientRecordValidator>;

type NewPatientEntry = z.infer<typeof NewPatientEntryValidator>;

type Entry = z.infer<typeof EntryValidator>;

export {
  PatientRecord,
  DiagnosisRecord,
  PublicPatientRecord,
  Gender,
  NewPatientEntry,
  Entry,
};
