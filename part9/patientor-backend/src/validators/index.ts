import { z } from "zod";

const Genders = ["male", "female", "other"] as const;

const GenderValidator = z.enum(Genders);

const ExpandedDiagnosisValidator = z.object({
  code: z.string(),
  name: z.string(),
  latin: z.string().optional(),
});

const BaseEntryValidator = z.object({
  id: z.string(),
  description: z.string(),
  date: z.string(),
  specialist: z.string(),
  diagnosisCodes: z
    .array(z.union([z.string(), ExpandedDiagnosisValidator]))
    .optional(),
  type: z.string(),
});

const HealthCheckEntryValidator = BaseEntryValidator.extend({
  type: z.literal("HealthCheck"),
  healthCheckRating: z.number().min(0).max(3),
});

const OccupationalHealthcareEntryValidator = BaseEntryValidator.extend({
  type: z.literal("OccupationalHealthcare"),
  employerName: z.string(),
  sickLeave: z
    .object({
      startDate: z.string().optional(),
      endDate: z.string().optional(),
    })
    .optional(),
});

const HospitalEntryValidator = BaseEntryValidator.extend({
  type: z.literal("Hospital"),
  discharge: z.object({
    date: z.string(),
    criteria: z.string(),
  }),
});

const PatientEntryValidator = z.union([
  HospitalEntryValidator,
  HealthCheckEntryValidator,
  OccupationalHealthcareEntryValidator,
]);

const newPatientEntryOmitters = {
  id: true,
} as const;

const NewPatientEntryValidator = z.union([
  HospitalEntryValidator.omit(newPatientEntryOmitters),
  HealthCheckEntryValidator.omit(newPatientEntryOmitters),
  OccupationalHealthcareEntryValidator.omit(newPatientEntryOmitters),
]);

const PatientRecordValidator = z.object({
  id: z.string(),
  name: z.string(),
  dateOfBirth: z.string(),
  ssn: z.string(),
  gender: GenderValidator,
  occupation: z.string(),
  entries: z.array(PatientEntryValidator).optional(),
});

const PublicPatientRecordValidator = PatientRecordValidator.omit({
  ssn: true,
  entries: true,
});

const NewPatientRecordValidator = PatientRecordValidator.omit({
  id: true,
});

export {
  PatientEntryValidator,
  PatientRecordValidator,
  PublicPatientRecordValidator,
  NewPatientRecordValidator,
  GenderValidator,
  BaseEntryValidator,
  HealthCheckEntryValidator,
  ExpandedDiagnosisValidator,
  NewPatientEntryValidator,
};
