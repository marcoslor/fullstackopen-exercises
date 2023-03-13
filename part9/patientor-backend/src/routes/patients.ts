import { Router } from "express";

import {
  addPatient,
  getPublicPatientRecords,
} from "../services/patientsService";
import { NewPatientEntryValidator } from "../validators";

const router = Router();

router.get("/", (_, res) => {
  res.send(getPublicPatientRecords());
});

router.post("/", (req, res) => {
  try {
    const newPatientEntry = NewPatientEntryValidator.parse(req.body);
    const addedPatient = addPatient(newPatientEntry);
    res.json(addedPatient);
  } catch (e) {
    res.status(400).send(e.message);
  }
});

export default router;
