import { Router } from "express";
import diagnoses from "../data/diagnoses";

const router = Router();

router.get("/", (_, res) => {
  res.send(diagnoses);
});

export default router;
