import { Router } from "express";
import { getPublicPatientRecords } from "../services/patientsService";

const router = Router();

router.get("/", (_, res) => {
  res.send(getPublicPatientRecords());
});

export default router;
