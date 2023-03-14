import { Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Patient } from "../../types";
import patientService from "../../services/patients";

const PatientInfoPage = () => {
  const { id } = useParams<{ id: string }>();
  const [patient, setPatient] = useState<Patient>();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!id) {
      return;
    }
    setIsLoading(true);

    patientService.getPatient(id).then((patient) => {
      setPatient(patient);
      setIsLoading(false);
    });
  }, [id]);

  if (isLoading || !patient) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Typography align="left" variant="h5">
        {patient.name}
      </Typography>
      <ul>
        <li>SSN: {patient.ssn}</li>
        <li>Occupation: {patient.occupation}</li>
      </ul>
    </div>
  );
};

export default PatientInfoPage;
