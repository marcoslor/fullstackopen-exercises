import { z } from "zod";

const genders = ["other", "female", "male"] as const;

const GenderValidator = z.enum(genders);

const EntryValidator = z.object({});

const PatientRecordValidator = z.object({
  id: z.string(),
  name: z.string(),
  dateOfBirth: z.string(),
  ssn: z.string(),
  gender: GenderValidator,
  occupation: z.string(),
  entries: z.array(EntryValidator).optional(),
});

const PublicPatientRecordValidator = PatientRecordValidator.omit({
  ssn: true,
  entries: true,
});

const NewPatientEntryValidator = PatientRecordValidator.omit({
  id: true,
});

export {
  PatientRecordValidator,
  PublicPatientRecordValidator,
  NewPatientEntryValidator,
  GenderValidator,
  EntryValidator,
};
