import axios from "axios";
import type { Diagnosis, Entry, Patient, PatientEntryFormValues, PatientFormValues, PublicPatient } from "../types";

import { apiBaseUrl } from "../constants";

const getAll = async () : Promise<PublicPatient[]> => {
  const { data } = await axios.get<PublicPatient[]>(
    `${apiBaseUrl}/patients`
  );

  return data;
};

const create = async (object: PatientFormValues) => {
  const { data } = await axios.post<Patient>(
    `${apiBaseUrl}/patients`,
    object
  );

  return data;
};

const getPatient = async (id: string) => {
  const { data } = await axios.get<Patient>(
    `${apiBaseUrl}/patients/${id}`
  );

  return data;
};

const getDiagnoses = async () => {
  const { data } = await axios.get<Diagnosis[]>(
    `${apiBaseUrl}/diagnoses`
  );

  return data;
}

const addEntry = async (id: string, object: PatientEntryFormValues) => {
  const { data } = await axios.post<Entry>(
    `${apiBaseUrl}/patients/${id}/entries`,
    object
  );

  return data;
}
// eslint-disable-next-line import/no-anonymous-default-export
export default {
  getAll, create, getPatient, getDiagnoses, addEntry
};

