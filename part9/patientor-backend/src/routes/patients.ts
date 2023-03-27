import { Router } from "express";
import { z } from "zod";

import {
  addEntry,
  addPatient,
  getPatients,
  getPublicPatientRecords,
} from "../services/patientsService";
import {
  NewPatientRecordValidator,
  NewPatientEntryValidator,
} from "../validators";

const router = Router();

router.get("/", (_, res) => {
  res.send(getPublicPatientRecords());
});

router.post("/", (req, res) => {
  try {
    const NewPatientRecord = NewPatientRecordValidator.parse(req.body);
    const addedPatient = addPatient(NewPatientRecord);
    res.json(addedPatient);
  } catch (e) {
    res.status(400).send(e.message);
  }
});

router.get("/:id", (req, res) => {
  const patients = getPatients();
  res.send(patients.find((patient) => patient.id === req.params.id));
});

router.post("/:id/entries", (req, res) => {
  try {
    const entry = NewPatientEntryValidator.parse(req.body);
    const patients = getPatients();
    const patient = patients.find((patient) => patient.id === req.params.id);
    if (patient) {
      const addedEntry = addEntry(patient, entry);
      return res.json(addedEntry);
    }
  } catch (err) {
    if (err instanceof z.ZodError) {
      return res.status(400).send(err.issues);
    }
  }

  return res.status(404).send("Patient not found");
});

export default router;
